import func from '../helpers/functions';

class User {
    constructor(users, firstName, lastName, email, gender, jobRole, department, address, password) {
        this.id = func.idIncrementor(users);
        this.createdOn = new Date().toString();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
        this.jobRole = jobRole;
        this.department = department;
        this.address = address;
        this.password = password;
    }
}

export default User;