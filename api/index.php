<?php
// echo "saving data  -- ";

error_reporting(E_ALL);
ini_set('display_errors',1);
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb=new DbConnect;
$conn=$objDb->connect();
$method=$_SERVER['REQUEST_METHOD'];

if($method=='POST'){
$uri = $_SERVER['REQUEST_URI'];





    switch($uri){


    //________________________PATRON LOGIN____________________________________________________
        case '/api/patronLogin':

            $user=json_decode(file_get_contents('php://input'));
            $sql = "SELECT patron_id FROM patrons U WHERE name = :name AND email = :email AND phone = :phone"; 
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':name',$user->name);
            $stmt->bindParam(':email',$user->email);
            $stmt->bindParam(':phone',$user->phone);

            $stmt->execute();

                $count = $stmt->rowCount();
                if ($count > 0) {
                    
                    
                    $response = array("message" => "Login Successfull");
                    http_response_code(200);

                
        
                } else {
                    $response = array("message" => "Failed to Login");
                http_response_code(401);
        
                }
        
            




            echo json_encode($response);

            break;



    //________________________NON PATRON LOGIN______________________________________________________
        case '/api/users/login':

            $user=json_decode(file_get_contents('php://input'));
            $sql = "SELECT user_id FROM users U WHERE username = :username AND email = :email AND password = :password"; 
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':username',$user->username);
            $stmt->bindParam(':password',$user->password);
            $stmt->bindParam(':email',$user->email);
            $stmt->execute();

                $count = $stmt->rowCount();
                if ($count > 0) {
                    if($user->email=='admin2@email.com' || $user->email=='admin@official.com'|| $user->email=='admin@email.com'){
                        $response = array("message" => "admin logged in");
                        http_response_code(402);
    
                }else{
                    
                    $response = array("message" => "Login Successfull");
                    http_response_code(200);

                }
        
                } else {
                    $response = array("message" => "Failed to Login");
                http_response_code(401);
        
                }
        
            




            echo json_encode($response);

            break;


    //________________________MEMBER SIGNUP____________________________________________________
        case '/api/users/save':
            $user=json_decode(file_get_contents('php://input'));
            $sql="INSERT INTO users(user_id, username, password,email) VALUES (null, :username, :password,:email)";
            $stmt=$conn->prepare($sql);
            $stmt->bindParam(':username',$user->username);
            $stmt->bindParam(':password',$user->password);
            $stmt->bindParam(':email',$user->email);
            if($stmt->execute()){
                
                $response = array("message" => "User Registered");
                http_response_code(200);

            }else {
                $response = array("message" => "error");
                http_response_code(401);


            }
            echo json_encode($response);
            break;


    //________________________PATRON SIGNUP____________________________________________________
            case '/api/patronsignup': 
                                
                $user = json_decode(file_get_contents('php://input'));

                $sql = "CALL add_patron_with_user(:name, :email, :phone, :address)";
                
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':name', $user->name);
                $stmt->bindParam(':email', $user->email);
                $stmt->bindParam(':phone', $user->phone);
                $stmt->bindParam(':address', $user->address);
                try{if($stmt->execute()){
                
                    $response = array("message" => "User Registered");
                    http_response_code(200);
        
                }else {
                    $response = array("message" => "Patron is not a user");
                    http_response_code(401);
        
        
                }
                }catch(PDOException $e){
                    $response=array("message"=> "invalid email for a new user");
                    http_response_code(402);
                }            
                echo json_encode($response);
                
            break;

    //________________________REQUEST A BOOK____________________________________________________
    case '/api/requestabook': 
                                
        $user = json_decode(file_get_contents('php://input'));

        $sql="INSERT INTO bookRequests 
                (user_email, bookRequested, author) VALUES 
                (:user_email, :bookRequested, :author)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':user_email', $user->user_email);
        $stmt->bindParam(':bookRequested', $user->bookRequested);
        $stmt->bindParam(':author', $user->author);


        try{if($stmt->execute()){
                
            $response = array("message" => "Request Submitted");
            http_response_code(200);

        }else {
            $response = array("message" => "Error");
            http_response_code(401);


        }
        }catch(PDOException $e){
            $response=array("message"=> "Exception thrown");
            http_response_code(400);
        }            
        echo json_encode($response);
        
        
    break;


    //________________________SEARCH A BOOK____________________________________________________
    case '/api/searchbook': 
        $user = json_decode(file_get_contents('php://input'));

        $sql="SELECT b.*, a.author_name, g.genre_name FROM books b 
            JOIN authors a ON b.author_id=a.author_id 
            JOIN genres g ON b.primary_genre_id = g.genre_id    
                WHERE book_name LIKE :book_name
                and g.genre_name LIKE :genre_name
                and a.author_name LIKE :author_name
                ;";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':book_name', '%' . $user->book_name . '%', PDO::PARAM_STR);
        $stmt->bindValue(':author_name', '%' . $user->author_name . '%', PDO::PARAM_STR);
        $stmt->bindValue(':genre_name', '%' . $user->genre_name . '%', PDO::PARAM_STR);
        
        $stmt->execute();
        
        if ($stmt->rowCount()>0){
            $books = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($books);
            break;

        }else {
            $response=array("message"=> "no such book");
            http_response_code(401);
            echo json_encode($response);
        }
        // // Set the response headers to indicate that the response is JSON
        header('Content-Type: application/json');
    break;





    //________________________ISSUE A BOOK____________________________________________________

    case '/api/issuebook': 
        $user = json_decode(file_get_contents('php://input'));
        $isbn = $user->isbn;
        $email = $user->email;

        $sql='INSERT INTO issuance (userEmail, ISBN, issuance_status)
        VALUES (:email, :isbn,"issued"); ';
        $stmt = $conn->prepare($sql);

        $stmt->bindValue(':isbn',  $isbn );
        $stmt->bindValue(':email',  $email );


        try{if($stmt->execute()){
            $books = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $response = array("message" => "Issued");
            echo json_encode($books);

            http_response_code(200);

        }else {
            $response = array("message" => "Error");
            http_response_code(401);


        }
        }catch(PDOException $e){
            $response=array("message"=> "Exception thrown");
            http_response_code(400);
        }            
        echo json_encode($response);
        
        
    
        // // Set the response headers to indicate that the response is JSON
        header('Content-Type: application/json');
    break;
    //________________________POST A PAYMENT____________________________________________________


    case '/api/payments':
        $user = json_decode(file_get_contents('php://input'));
        
        $amountt=$user->amount;

        $email = $user->email;


        $sql='INSERT INTO payment (patron_email, payment_amount) 
                VALUES(:email, :amountt);';
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':email',  $email );

        $stmt->bindValue(':amountt', $amountt);

        try{if($stmt->execute()){
            $response = array("message" => "Paid");

            http_response_code(200);

        }else {
            $response = array("message" => "Error");
            http_response_code(401);


        }
        }catch(PDOException $e){
            $response=array("message"=> "Exception thrown");
            http_response_code(400);
        }            
        echo json_encode($response);
        

        
        break;
    //________________________GET PAYMENT HISTORY____________________________________________________

    case '/api/paymenthistory': 
        $user = json_decode(file_get_contents('php://input'));

        $sql="SELECT * FROM payment WHERE patron_email=:email;";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':email', $user->email);
        
        $stmt->execute();
        
        if ($stmt->rowCount()>0){
            $payments = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($payments);
            break;

        }else {
            $response=array("message"=> "err");
            http_response_code(401);
            echo json_encode($response);
        }
        // // Set the response headers to indicate that the response is JSON
        header('Content-Type: application/json');
    break;


    case '/api/getissued': 
        $user = json_decode(file_get_contents('php://input'));

        $sql="SELECT issuance.IID, issuance.UserEmail, issuance.ISBN, books.book_name, 
            authors.author_name, issuance.dateIssued, issuance.issuance_status 
            FROM issuance JOIN books ON books.isbn=issuance.ISBN JOIN authors ON books.author_id=authors.author_id WHERE userEmail=:email AND issuance.issuance_status='issued';";
        $stmt = $conn->prepare($sql);
        $stmt->bindValue(':email', $user->email);
        
        $stmt->execute();
        
        if ($stmt->rowCount()>0){
            $payments = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($payments);
            break;

        }else {
            $response=array("message"=> "err");
            http_response_code(401);
            echo json_encode($response);
        }
        // // Set the response headers to indicate that the response is JSON
        header('Content-Type: application/json');
    break;


    case '/api/addbook':
        $user=json_decode(file_get_contents('php://input'));
        $sql="INSERT INTO books(isbn, author_id, book_name,primary_genre_id, category) 
            VALUES (:isbn, :author_id, :book_name,:primary_genre_id, :category);";
        $stmt=$conn->prepare($sql);
        $isbn=$user->isbn;
        $author_id=$user->author_id;
        $book_name=$user->book_name;
        $primary_genre_id=$user->primary_genre_id;
        $category=$user->category;
        $stmt->bindParam(':isbn',$isbn);
        $stmt->bindParam(':author_id',$author_id);
        $stmt->bindParam(':book_name',$book_name);
        $stmt->bindParam(':primary_genre_id',$primary_genre_id);
        $stmt->bindParam(':category',$category);
        try{if($stmt->execute()){
            $response = array("message" => "Added");
            http_response_code(200);
        }else {
            $response = array("message" => "Error");
            http_response_code(401);
        }
        }catch(PDOException $e){
            $response=array("message"=> "Exception thrown");
            http_response_code(400);
        }   
        echo json_encode($response);
        break;


        
    case '/api/addauthor':
        $user=json_decode(file_get_contents('php://input'));
        $sql="INSERT INTO authors(author_name) VALUES (:author_name);";
        $stmt=$conn->prepare($sql);
        $author_name=$user->author_name;
        $stmt->bindParam(':author_name',$author_name);
        try{if($stmt->execute()){
            $response = array("message" => "Added");
            http_response_code(200);
        }else {
            $response = array("message" => "Error");
            http_response_code(401);
        }
        }catch(PDOException $e){
            $response=array("message"=> "Exception thrown");
            http_response_code(400);
        }   
        echo json_encode($response);
        break;



        case '/api/addgenre':
            $user=json_decode(file_get_contents('php://input'));
            $sql="INSERT INTO genres(genre_name) VALUES (:genre_name);";
            $stmt=$conn->prepare($sql);
            $genre_name=$user->genre_name;
            $stmt->bindParam(':genre_name',$genre_name);
            try{if($stmt->execute()){
                $response = array("message" => "Added");
                http_response_code(200);
            }else {
                $response = array("message" => "Error");
                http_response_code(401);
            }
            }catch(PDOException $e){
                $response=array("message"=> "Exception thrown");
                http_response_code(400);
            }   
            echo json_encode($response);
        break;



        case '/api/returnbook':
            $user=json_decode(file_get_contents('php://input'));

                $email = $user->email;
                $isbn = $user->isbn;
                $sql="UPDATE issuance SET issuance_status='Returned' WHERE UserEmail=:email AND ISBN=:isbn;";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':isbn', $isbn);
            $stmt->execute();

            $response = array("message" => "Issuance status updated to 'Returned'");
            echo json_encode($response);
        
        break;

        case '/api/getposts':
            $user=json_decode(file_get_contents('php://input'));

            $book_name = $user->book_name;
            $sql="SELECT book_name, post_description from discussion_board WHERE book_name=:book_name ";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':book_name', $book_name);

           
            try{if($stmt->execute()){
                
                    $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($reviews);
                break;

                
                

                
            }else {
                $response = array("message" => "Error");
                http_response_code(401);
            }
            }catch(PDOException $e){
                $response=array("message"=> "Exception thrown");
                http_response_code(400);
            }   
            echo json_encode($response);


            $response = array("message" => "Issuance status updated to 'Returned'");
            echo json_encode($response);
        
        break;


        case '/api/reply':
            $user=json_decode(file_get_contents('php://input'));

            $email = $user->email;
            $name = $user->name;
            $book_name = $user->book_name;
            $post_desc = $user->post_description;



            $sql="INSERT INTO discussion_board (user_email, user_name, book_name,  post_description) 
                VALUES (:email, :name, :book_name, :post_desc);";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':book_name', $book_name);
            $stmt->bindParam(':post_desc', $post_desc);
            try{if($stmt->execute()){
                $response = array("message" => "replied!");
                http_response_code(200);
            }else {
                $response = array("message" => "Error");
                http_response_code(401);
            }
            }catch(PDOException $e){
                $response=array("message"=> "Exception thrown");
                http_response_code(400);
            }   
            echo json_encode($response);

        
        break;
        
            



    default:
        // Send an error response if the "type" parameter is not recognized
        http_response_code(400);
        $response = array("message" => "Invalid request (responded by default post)");
        echo json_encode($response);
        break;



    }
} //if statement wrap for post 


if($method=='GET'){
    $uri = $_SERVER['REQUEST_URI'];

    switch($uri){
        case '/api/getallbooks':
            $sth = $conn->prepare('SELECT b.isbn, b.book_name, a.author_name, g.genre_name, b.category, p.publisherName
            FROM books b
            JOIN authors a ON b.author_id = a.author_id
            JOIN genres g ON b.primary_genre_id = g.genre_id
            JOIN publisher p ON b.isbn=p.isbn;');
            $sth->execute();
            $books = $sth->fetchAll(PDO::FETCH_ASSOC);
            
            // Set the response headers to indicate that the response is JSON
            header('Content-Type: application/json');
            
            // Return the list of books as JSON
            echo json_encode($books);



        break;





        case '/api/getphysicalbooks':
            $sth = $conn->prepare('SELECT books.isbn,  books.book_name, books.category, authors.author_name 
                FROM books  JOIN authors on authors.author_id=books.author_id WHERE books.category="Physical"; ');
            $sth->execute();
            $physicalBooks = $sth->fetchAll(PDO::FETCH_ASSOC);
            
            // Set the response headers to indicate that the response is JSON
            header('Content-Type: application/json');
            
            // Return the list of books as JSON
            echo json_encode($physicalBooks);



        break;
       

        case '/api/getdigitalbooks':
            $sth = $conn->prepare('SELECT books.isbn,  books.book_name, books.category, authors.author_name 
                FROM books  JOIN authors on authors.author_id=books.author_id WHERE books.category="Digital"; ');
            $sth->execute();
            $digitalbooks = $sth->fetchAll(PDO::FETCH_ASSOC);
            
            // Set the response headers to indicate that the response is JSON
            header('Content-Type: application/json');
            
            // Return the list of books as JSON
            echo json_encode($digitalbooks);



        break;

        case '/api/getallpayments':
            $sth = $conn->prepare('SELECT * FROM payment;');
            $sth->execute();
            $payments = $sth->fetchAll(PDO::FETCH_ASSOC);
            
            // Set the response headers to indicate that the response is JSON
            header('Content-Type: application/json');
            
            // Return the list of books as JSON
            echo json_encode($payments);



        break;

        case '/api/monthlyPayment':
            $sth = $conn->prepare('CALL GetTotalPaymentsLasMonth();
            ');
            $sth->execute();
            $payments = $sth->fetchAll(PDO::FETCH_ASSOC);
            
            // Set the response headers to indicate that the response is JSON
            header('Content-Type: application/json');
            
            // Return the list of books as JSON
            echo json_encode($payments);



        break;
        case '/api/weeklyPayment':
            $sth = $conn->prepare('CALL GetTotalPaymentsLastWeek();');
            $sth->execute();
            $payments = $sth->fetchAll(PDO::FETCH_ASSOC);
            
            // Set the response headers to indicate that the response is JSON
            header('Content-Type: application/json');
            
            // Return the list of books as JSON
            echo json_encode($payments);



        break;
        case '/api/dailyPayment':
            $sth = $conn->prepare('CALL getTotalPaymentsToday();');
            $sth->execute();
            $payments = $sth->fetchAll(PDO::FETCH_ASSOC);
            
            // Set the response headers to indicate that the response is JSON
            header('Content-Type: application/json');
            
            // Return the list of books as JSON
            echo json_encode($payments);



        break;

        case '/api/getallusers':
            $sth = $conn->prepare('SELECT * from users;');
            $sth->execute();
            $users = $sth->fetchAll(PDO::FETCH_ASSOC);
            
            // Set the response headers to indicate that the response is JSON
            header('Content-Type: application/json');
            
            // Return the list of books as JSON
            echo json_encode($users);



        break;
        case '/api/getpatrons':
            $sth = $conn->prepare('SELECT * from patrons;');
            $sth->execute();
            $patrons = $sth->fetchAll(PDO::FETCH_ASSOC);
            
            // Set the response headers to indicate that the response is JSON
            header('Content-Type: application/json');
            
            // Return the list of books as JSON
            echo json_encode($patrons);



        break;
        case '/api/getBookRequest':
            $sth = $conn->prepare('SELECT * from bookrequests;');
            $sth->execute();
            $requests = $sth->fetchAll(PDO::FETCH_ASSOC);
            
            // Set the response headers to indicate that the response is JSON
            header('Content-Type: application/json');
            
            // Return the list of books as JSON
            echo json_encode($requests);



        break;


        case '/api/getallauthors':
            $sth = $conn->prepare('SELECT * from authors;');
            $sth->execute();
            $authors = $sth->fetchAll(PDO::FETCH_ASSOC);
            
            // Set the response headers to indicate that the response is JSON
            header('Content-Type: application/json');
            
            // Return the list of books as JSON
            echo json_encode($authors);



        break;
        case '/api/getallgenres':
            $sth = $conn->prepare('SELECT * from genres;');
            $sth->execute();
            $authors = $sth->fetchAll(PDO::FETCH_ASSOC);
            
            // Set the response headers to indicate that the response is JSON
            header('Content-Type: application/json');
            
            // Return the list of books as JSON
            echo json_encode($authors);



        break;





    


        default:
            // Send an error response if the "type" parameter is not recognized
            http_response_code(400);
            $response = array("message" => "Invalid request (responded by default get)");
            echo json_encode($response);
        break;
       

    }
}// if statement wrap for get


if($method=='DELETE'){
    $uri = $_SERVER['REQUEST_URI'];
    
            $sql = "DELETE FROM bookrequests WHERE request_id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record.'];
        }
        echo json_encode($response);
            



       

}// if statment wrap for delete


// if($method=='PUT'){
//     $uri = $_SERVER['REQUEST_URI'];
    

// }
