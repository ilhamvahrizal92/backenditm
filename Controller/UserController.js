import { authenticate } from 'ldap-authentication'


export const getUsersLdap = async (req, res) => {
  
    try {
          // auth with regular user
        const  options = {
            ldapOpts: {
              url: 'ldap://ldap.forumsys.com',
              // tlsOptions: { rejectUnauthorized: false }
            },
            userDn: 'uid=einstein,dc=example,dc=com',
            userPassword:  req.body.password,
            userSearchBase: 'dc=example,dc=com',
            usernameAttribute: 'uid',
            username: req.body.email,
            // starttls: false
          }
        
        const  user = await authenticate(options)

const dn = user.dn;
const objectClass = user.objectClass;
const userPassword = user.userPassword;
const cn = user.cn;
const sn = user.sn;
const uid = user.uid;
const mail = user.mail;
const telephoneNumber = user.telephoneNumber;

const personValue = user.objectClass.find(value => value === 'person');

req.session.userId = cn;

const pay = {
      "uuid": uid,
      "name": cn,
      "email": mail,
      "role": personValue
  };
    res.status(200).json(pay);
    } catch (error) {
      res.status(500).json({msg: "Invalid Credential"});

    }

}

export const getMeLdap = async (req, res) => {
    if(!req.session.userId) {
        return res.status(401).json({msg: "Mohon Login"});
    }

    const user = req.session.userId;

    const pay = {
      "name": user
    }

    console.log('user', user);

    return res.status(200).json(pay);
}