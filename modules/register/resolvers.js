import * as bcrypt from 'bcryptjs';
import 'babel-polyfill';
import * as yup from 'yup';

import User from '../../models/User';
import {duplicateEmail,emailNotLongEnough,invalidEmail,passwordNotLongEnough, duplicateUsername} from './errorMessages';
import {formatYupError} from '../../utils/formatYupError';
import {createConfirmEmailLink} from '../../utils/createConfirmEmailLink';
import {sendEmail} from '../../utils/sendEmail';

const schema=yup.object().shape({
	username: yup
			.string()
			.matches(/^[a-zA-Z0-9]*$/, "Only numbers and letters are allowed")
			.min(3)
			.max(30)
			.required(),
	email : yup
			.string()
			.min(5,emailNotLongEnough)
			.max(255)
			.email(invalidEmail)
			.required(),
	password: yup
			.string()
			.min(3,passwordNotLongEnough)
			.max(255)
			.required()
});

export const resolvers={
	Query: {
		bye: () => "Bye"
	},

	Mutation: {
		register: async (_, args,{redis,url})=>{

			try{
				await schema.validate(args,{abortEarly:false});
			}
			catch(err){
				return formatYupError(err);
			}

			const {email,password,username} = args;
			const UserAlreadyExists=await User.findOne({email:email});
			if(UserAlreadyExists){
				return [
					{
						path: "email",
						message: duplicateEmail
					}
				];
			}
			const UsernameAlreadyExists=await User.findOne({username:username});
			if(UsernameAlreadyExists){
				return [
					{
						path: "username",
						message: duplicateUsername
					}
				];
			}

			// const hashedPassword = await bcrypt.hash(password,10);
			var user = new User();
			user.email = email;
			user.username = username;
			user.password = password;
			await user.save();
			const link = await createConfirmEmailLink(url,user._id,redis);
			if(process.env.NODE_ENV!=='test'){
				// await sendEmail(email,link);
				console.log("registered!");
			}
			return null;
		}
	}
}