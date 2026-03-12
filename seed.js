import 'dotenv/config'
import { PrismaClient } from './lib/generated/prisma/client.ts'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Criptografando a senha...')
  const hashedPassword = bcrypt.hashSync('Felipe1998@26', 10)

  console.log('Inserindo usuário no banco...')
  const user = await prisma.user.create({
    data: {
      email: 'fernandesjoaophillipe@gmail.com',
      password: hashedPassword,
    },
  })

  console.log('✅ Usuário admin criado com sucesso!', user)
}

main()
  .catch((e) => {
    console.error('❌ Deu erro:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
