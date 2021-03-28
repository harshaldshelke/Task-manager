const sgMail=require('@sendgrid/mail')

const APIKey=''

sgMail.setApiKey(APIKey)

const sendWelcomeMail=(email,name)=>{
    console.log(`${email}`)
    sgMail.send({
        to:email,
        from:'harshaldshelke@gmail.com',
        subject:'Welcome to My Task App',
        Text:`Hi ${ name }, Your account is ready`
    }).then((data)=>{
        console.log('send')
    }).catch((err)=>{
        console.log('Failed ' + err)
    })
    
}

module.exports=sendWelcomeMail