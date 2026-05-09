import conf from "../../conf/conf.js";
import { Client, Account, ID } from "appwrite"; // boiler plate from appwrite

/* 
-   modified code of appwrite auth boiler plate
-   The constructor is used here because Appwrite requires 
    you to initialize a client first before you can do anything.
    Without setting the endpoint and project ID, 
    Appwrite doesn't even know which project to talk to.
-   To make the code mess free, we do this:
-   we want that every time an object is created of auth service, 
    to set the client with endpoint and project, 
    so we put these methods inside a constructor

*/
export class AuthService {
  client = new Client();
  account;

  // this is called everytime a new object of Auth Service class is created
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );

      if (userAccount) {
        return this.login({ email, password });
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // check the authentication state of the user
  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (err) {
      console.log("Appwrite service :: getCurrentUser :: error", err);
    }
    return null;
  }

  // logout session
  async logout() {
    try {
      const user = await this.account.deleteSessions();
    } catch (err) {
      throw err;
    }
    return null;
  }
}

const authService = new AuthService(); // object of auth service class

export default authService;
