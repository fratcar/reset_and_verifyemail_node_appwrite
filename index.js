import express from "express"
import cors from "cors"
import {updateNewPassword,updateVerification} from "./controllers/auth_controllers.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(express.static("public"))

// server home
app.get("/", (req, res) => {
    res.render("index")
})

// email veriifcation endpoint
app.get("/verify",async(req,res)=>{
    const {userId,secret}=req.query;
    console.log("userId",userId);
    console.log("secret",secret);

    try{
        const result = await updateVerification(userId, secret); // Wait for updateVerification function to complete
        console.log(result);
        res.render("template",{title:"✅ Verification Complète", message:"Votre adresse email a bien été vérifiée.",});
    }
    catch(e){
        res.render("template",{title:"❌ Echec de la vérification", message:`⚠️ Raison : ${e.message}`,});
    }
})

// password reset endpoint
app.get("/recovery", (req, res) => {
    const {userId,secret}=req.query;
    console.log("userId",userId);
    console.log("secret",secret);
    res.render("reset_password",{userId,secret,message:""});
});

// complete password reset post endpoint
app.post("/reset_password", async (req, res) => {
    const { userId, secret, password, password_confirm } = req.body;

    if (password !== password_confirm) {
        res.render("reset_password",{userId,secret, message:"Les mots de passe ne correspondent pas"});
    }

    if (password.length < 8) {
        res.render("reset_password",{userId,secret, message:"Votre mot de passe doit au moins faire 8 caractère"});
    }

    try {
        const result = await  updateNewPassword(userId,secret,password,password_confirm); // Wait for updatePassword function to complete
        console.log(result);
        res.render("template",{title:"✅ Mot de passe renouvelé", message:"Votre mot de passe a bien été changé avec succès.",});
    } catch (err) {
        res.render("template",{title:"❌ Echec du changement de mot de passe", message:`⚠️ Raison : ${err.message}`,});
    }
});

// 404 error page
app.get("*", (req, res) => {
    res.render("template",{title:"❌ Error", message:"⚠️ Page not found",});
});

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
