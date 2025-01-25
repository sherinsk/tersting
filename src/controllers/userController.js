const bcrypt = require('bcrypt');
const prisma=require('../config/dataBase')



const userController={
    async registration(req,res)
    {
        try {
            const { name, email, password } = req.body;
        
            if (!name || !email || !password) {
              return res.status(400).json({ error: 'Name, email, and password are required.' });
            }
        
            const existingUser = await prisma.user.findUnique({
              where: { email },
            });
        
            if (existingUser) {
              return res.status(409).json({ error: 'Email already exists.' });
            }
        
            const hashedPassword = await bcrypt.hash(password, 10);
        
            await prisma.user.create({
              data: {
                name,
                email,
                password: hashedPassword
              },
            });

            res.status(201).json({ message: 'User registered successfully' });
          } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ error: 'Internal server error' });
          }
    },
    async showAll(req,res)
    {
        try {
            const users=await prisma.user.findMany()
            res.status(201).json({users});
          } catch (error) {
            console.error('Error registering user:', error);
            res.status(500).json({ error: 'Internal server error' });
          }
    }
}

module.exports={userController}