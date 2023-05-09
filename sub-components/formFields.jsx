const loginFields=[
    {
        labelText:"username",
        labelFor:"username",
        id:"username",
        name:"username",
        type:"text",
        autoComplete:"username",
        isRequired:true,
        placeholder:"Username"   
    },
    {
        labelText:"email",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"
    },
    {
        labelText:"password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"password",
        isRequired:true,
        placeholder:"Password"   
    }
]
const patronFields=[
    {
        labelText:"name",
        labelFor:"name",
        id:"name",
        name:"name",
        type:"text",
        autoComplete:"name",
        isRequired:true,
        placeholder:"name"   
    },
    {
        labelText:"email",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"
    },
    {
        labelText:"phone",
        labelFor:"phone",
        id:"phone",
        name:"phone",
        type:"password",
        isRequired:true,
        placeholder:"phone"   
    }
]

const signupFields=[
    {
        labelText:"username",
        labelFor:"username",
        id:"username",
        name:"username",
        type:"text",
        autoComplete:"username",
        isRequired:true,
        placeholder:"Username"   
    },
   
    {
        labelText:"password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Password"   
    },
   
    {
        labelText:"email",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    }
]
const bookRequestFields=[
    {
        labelText:"user_email",
        labelFor:"user_email",
        id:"user_email",
        name:"user_email",
        type:"email",
        autoComplete:"user_email",
        isRequired:true,
        placeholder:"Enter Your Email"   
    },
    {
        labelText:"bookRequested",
        labelFor:"bookRequested",
        id:"bookRequested",
        name:"bookRequested",
        type:"text",
        autoComplete:"bookRequested",
        isRequired:true,
        placeholder:"Name of Book"   
    },
    
    {
        labelText:"author",
        labelFor:"author",
        id:"author",
        name:"author",
        type:"author",
        autoComplete:"author",
        isRequired:false,
        placeholder:"Author"   
    }

]
const replyField=[
    {
        labelText:"reply",
        labelFor:"reply",
        id:"reply",
        name:"reply",
        type:"text",
        autoComplete:"reply",
        isRequired:true,
        placeholder:"Reply"   
    }
]
const addBookFields=[
    {
        labelText:"name",
        labelFor:"name",
        id:"name",
        name:"name",
        type:"text",
        autoComplete:"name",
        isRequired:true,
        placeholder:"Name"

    },
    {
        labelText:"isbn",
        labelFor:"isbn",
        id:"isbn",
        name:"isbn",
        type:"text",
        autoComplete:"isbn",
        isRequired:true,
        placeholder:"ISBN"

    },
    {
        labelText:"author",
        labelFor:"author",
        id:"author",
        name:"author",
        type:"text",
        autoComplete:"author",
        isRequired:true,
        placeholder:"Author"

    },
    {
        labelText:"keywords",
        labelFor:"keywords",
        id:"keywords",
        name:"keywords",
        type:"keywords",
        autoComplete:"keywords",
        isRequired:true,
        placeholder:"Keywords"

    },
    {
        labelText:"category",
        labelFor:"category",
        id:"category",
        name:"category",
        type:"category",
        autoComplete:"category",
        isRequired:true,
        placeholder:"Category"

    }
]

const patronSignupFields=[
    {
        labelText:"name",
        labelFor:"name",
        id:"name",
        name:"name",
        type:"text",
        autoComplete:"name",
        isRequired:true,
        placeholder:"Name"   
    },
   
   
    {
        labelText:"email",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        labelText:"phone",
        labelFor:"phone",
        id:"phone",
        name:"phone",
        type:"text",
        autoComplete:"phone",
        isRequired:true,
        placeholder:"Phone-Number"   
    },
    {
        labelText:"address",
        labelFor:"address",
        id:"address",
        name:"address",
        type:"text",
        autoComplete:"address",
        isRequired:false,
        placeholder:"Address"   
    }
]
const searchBookFields=[
    {
        labelText:"book_name",
        labelFor:"book_name",
        id:"book_name",
        name:"book_name",
        type:"text",
        autoComplete:"book_name",
        isRequired:true,
        placeholder:"Enter Book Name"

    },
    {
        labelText:"author_name",
        labelFor:"author_name",
        id:"author_name",
        name:"author_name",
        type:"text",
        autoComplete:"author_name",
        isRequired:false,
        placeholder:"Enter Author Name"

    },
    {
        labelText:"genre_name",
        labelFor:"genre_name",
        id:"genre_name",
        name:"genre_name",
        type:"text",
        autoComplete:"genre_name",
        isRequired:false,
        placeholder:"Enter Genre "

    },

]
const returnBookFields=[
    {
        labelText:"email",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Enter Your Email"

    }
]
const paymentFields=[
    {
        labelText: "amount",
    labelFor: "amount",
    id: "amount",
    name: "amount",
    type: "number",
    step: "0.01",
    min: "1",
    isRequired: true,
    placeholder: "Enter Payment Amount"
    }
]
export {loginFields,signupFields,bookRequestFields,patronFields, 
    replyField, addBookFields, patronSignupFields, searchBookFields,
    returnBookFields, paymentFields}