import func from '../helpers/functions';
import users from '../models/userModel';
class User {
    constructor(firstName, lastName, email, gender, jobRole, department, address, password) {
        this.id = func.idIncrementor(users);
        this.createdOn = new Date().toString();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
        this.jobRole = jobRole;
        this.isAdmin = false;
        this.department = department;
        this.address = address;
        this.password = password;
    }
}

export default User;