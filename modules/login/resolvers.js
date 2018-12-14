import * as bcrypt from 'bcryptjs';
import 'babel-polyfill';

import User from '../../models/User';
import {createConfirmEmailLink} from '../../utils/createConfirmEmailLink';
import {sendEmail} from '../../utils/sendEmail';
import {
	invalidLogin,
	errorFinding,
	invalidPassword,
	emailNotVerified,
	forgotPassword
} from './errorMessages';


export const resolvers={
	Query: {
		bye2: () => "Bye"
	},

	Mutation: {
		login: async (_, {usernameOrEmail,password},{session,redis,req})=>{
			const user = await User.findOne({$or: [ { username: usernameOrEmail }, { email: usernameOrEmail } ]})
			if(!user){
				return  {
					errors: [{
						path: "email",
						message:"invalid login"
					}],
					user: null
				}
			}
			if(!user.confirmed){
				return  {
					errors: [{
						path: "email",
						message:emailNotVerified
					}],
					user: null
				}
			}

			if(user.forgotPasswordLocked){
				return  {
					errors: [{
						path: "email",
						message: forgotPassword
					}],
					user: null
				}
			}

			var validPassword=await bcrypt.compare(password,user.password);
			if(!validPassword){
				return  {
					errors: [{
						path: "password",
						message: invalidPassword
					}],
					user: null
				}
			}

			session.userId=user.id;
			if(req.sessionID){
				await redis.lpush(`userSids:${user.id}`,req.sessionID);
			}
			await session.save(function(err){
				console.log(err);
			});
			return  {
					errors: null,
					user: user
				}
		}
	}
}