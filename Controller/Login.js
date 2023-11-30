import express from 'express';
import { auth } from '../middleware/ldapcon.js';

/*
 dn: 'uid=einstein,dc=example,dc=com',
  objectClass: [ 'inetOrgPerson', 'organizationalPerson', 'person', 'top' ],
  userPassword: '{sha}W6ph5Mm5Pz8GgiULbPgzG37mj9g=',
  cn: 'Albert Einstein',
  sn: 'Einstein',
  uid: 'einstein',
  mail: 'einstein@ldap.forumsys.com',
  telephoneNumber: '314-159-2653'

  */
export const Login = async (req, res) => {
    try {
        const user = await auth();
        const uid = user.uid;
        if(!uid) return res.status(404).json({msg: "User Not Found"});
         return res.status(200).json({msg: uid});
    } catch (error) {
        console.log('err', error);
    }

    
   // const verifyuser  = user.userPassword
    //const me = user.uid;
    //console.log('session',  req.session.uid );
    //res.status(200).json({me});
}