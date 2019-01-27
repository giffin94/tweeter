

//call registryhelper function to make sure the user's email and tag are not taken




module.exports = {

    checkEmailAndTag: function(userObject, allUsers) {
      let tagOk = true;
      let emailOk = true;
      allUsers.forEach((element) => {
        if(element.email === userObject.email) {
          emailOk = false;
        } else if(element.tag === userObject.tag) {
          tagOk = false;
        }
      });
let userFlags = [tagOk, emailOk]
return userFlags;
  }
} 