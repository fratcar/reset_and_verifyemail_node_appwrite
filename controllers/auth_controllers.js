import {Client,Account,ID,Functions} from "appwrite"
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient("https://hzmnbpmlaltuhbzxvvsb.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6bW5icG1sYWx0dWhienh2dnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwNDA5NTYsImV4cCI6MjA0MjYxNjk1Nn0.gZi961CtITlgEYL5BIDw6P0iKXrhgOItZFVWoT1dMdc")

const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
.setProject('66f4ad57002d8bb0bf87')  // Your project ID

const account = new Account(client);

// complete verification for the client
export const updateVerification = async (userId, secret) => {
    try{
        
        const response = await supabase.auth.resend({
          type: 'signup',
          email: userEmail,
        })
       // const response=await account.updateVerification(userId, secret);
         console.log(response); // Success
            return response;
    }
    catch(error){
        console.log(error); // Failure
        throw error;
    }
}

// update and reset the password
export const updateNewPassword = async (userId, secret, password,password_confirm) => {
    try {
        const response = await account.updateRecovery(userId, secret, password,password_confirm);
        console.log(response); // Success
        return response;
    } catch (error) {
        console.log(error); // Failure
        throw error;
    }
};
