import { UserAttributes } from '../../models/userModel'; // Adjust the path to your User model

declare global {
  namespace Express {
    interface Request {
      user?: {id:number;email:string}; // or use a specific type if needed
    }
  }
}
