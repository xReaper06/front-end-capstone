import Api from './Api'
import Auth from './Auth'

export default{
    //auth
    userRegistration(credentials){
        return Auth().post('/userRegistration',credentials)
    },
    login(credentials){
        return Auth().post('/login',credentials)
    },
    logout(id){
        return Auth().post(`/logout`,id);
    },
    verifyEmail(credentials){
        return Api().post('/verifyEmail',credentials);
    },
    sendEmailtoVerify(credentials){
        return Auth().post('/sendEmailtoVerify',credentials);
    },
    //main
    insertLicense(credentials){
        return Api().post('/verifyLicense',credentials)
    },
    verifyLicense(credentials){
        return Api().post('/verifiedLicense/',credentials)
    },
    denyVerification(credentials){
        return Api().post('/denyVerification',credentials)
    },
    getMyLicense(user_id){
        return Api().post('/getMyLicense/',user_id)
    },
    getMyViolation(credentials){
        console.log(credentials)
        return Api().post('/getMyViolation',credentials)
    },
    
    notifications(user_id){
        return Api().post('/notifications/',user_id)
    },
    getAllLicenseVerified(){
        return Api().get('/getAllLicenseVerified')
    },
    getAllLicenseNotYetVerified(){
        return Api().get('/getAllLicenseNotYetVerified')
    },
    getAllViolationList(){
        return Api().get('/getAllViolationList')
    },
    insertViolations(credentials){
        return Api().post('/insertViolations',credentials)
    },
    updateViolationStatus(credentials){
        return Api().post('/updateViolationStatus',credentials)
    },
    deleteViolationList(credentials){
        return Api().post('/deleteViolationList',credentials)
    },
    enforcerRegistration(credentials){
        return Api().post('/enforcerRegistration',credentials)
    },
    removeEnforcer(credentials){
        return Api().post('/removeEnforcer',credentials)
    },
    getAllUsers(){
        return Api().get('/getAllUsers')
    },
    getAllEnforcer(){
        return Api().get('/getAllEnforcers')
    },
    getAllLicensebyID(id){
        return Api().get(`/getAllLicensebyID/${id}`)
    },
    getAllViolators(){
        return Api().get('/getAllViolators')
    },
    getAllViolatorsImpound(){
        return Api().get('/getAllViolatorsImpound')
    },
    getAllViolatorsNormal(){
        return Api().get('/getAllViolatorsNormal')
    },
    normalCitation(credentials){
        return Api().post('/normalCitation',credentials)
    },
    impoundCitation(credentials){
        return Api().post('/impoundCitation',credentials)
    },
    getUserViolations(credentials){
        return Api().post('/getUserViolations',credentials)
    },
    enableUser(credentials){
        return Api().post('/enableUser',credentials);
    },
    disableUser(credentials){
        return Api().post('/disableUser',credentials)
    },
    updateLicense(credentials){
        return Api().post('/updateLicense',credentials)
    },
    //auth
    changeProfilePic(credentials){
        return Api().post('/changeProfile',credentials)
    },
    changePassword(credentials){
        return Api().post('/changePassword',credentials)
    },
    markNotificationAsRead(credentials){
        return Api().post('/markNotificationAsRead',credentials)
    },
    AllViolationsList(){
        return Api().get('/AllViolationsList');
    }
}