class User {
    constructor(firstName, lastName, email, gender, jobRole, department, address, password) {
        this.createdOn = new Date();
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