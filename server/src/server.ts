import { PrismaClient } from "@prisma/client";
import fastify, { FastifyBodyParser, FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv'

interface RequestBody {
  userId?: any;
  instituteId?: any;
  typeblood: any;
  id?: string;
  name: string;
  cpf: string;
  email: string;
  gender: string;
  uf: string;
  city: string;
  biogender: string;
  role: string;
  address: string;
  birth: string;
  attributes: Record<string, string>;
  password: string;
}

interface RequestBodyInstitute {
  segment: number;
  name: string;
  cpf: string;
  uf: string;
  city: string;
  email: string;
  desc: string;
  role: string;
  address: string;
  attributes: Record<string, string>;
  password: string;
}

enum BioGender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
}

enum Gender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  UNDEFINED = 'UNDEFINED',
}

dotenv.config()
const app = fastify();
const prisma = new PrismaClient()
const urls = ["http://localhost:3000"];

// CORS
app.register(cors, {
  origin: urls,
  methods: ['GET', 'POST'],
  credentials: true
})

// Users

// Counter
app.get('/users/count', async (request: FastifyRequest, reply: FastifyReply) => {
  const count = await prisma.users.count()
  return reply.send(count);
})

// Check Email
app.post('/checkemail/', async (request: FastifyRequest, reply: FastifyReply) => {
  const requestBody = request.body as RequestBody;
  const user = await prisma.users.findFirst({
    where: {
      user_email: {
        equals: requestBody.email
      }
    }
  });
  const institute = await prisma.intitutes.findFirst({
    where: {
      institute_email: {
        equals: requestBody.email
      }
    }
  });
  if (user || institute) {
    return reply.send(true).status(200);
  } else {
    return reply.send(false).status(200);
  }
})

// Get User By Email
app.post('/users/getuser/', async (request: FastifyRequest, reply: FastifyReply) => {
  const requestBody = request.body as RequestBody;
  const user = await prisma.users.findFirst({
    where: {
      user_email: {
        equals: requestBody.email
      }
    },
    select: {
      user_address: true,
      user_attributes: true,
      user_biogender: true,
      user_typeblood: true,
      user_birth: true,
      user_city: true,
      user_cpf: true,
      user_email: true,
      user_id: true,
      user_gender: true,
      user_name: true,
      user_uf: true,
    }
  });
  if (user) {
    return reply.send(user).status(200);
  } else {
    return reply.send(false).status(200);
  }
})

app.post('/users/getuserbyid/', async (request: FastifyRequest, reply: FastifyReply) => {
  const requestBody = request.body as RequestBody;
  const user = await prisma.users.findFirst({
    where: {
      user_id: {
        equals: requestBody.userId
      }
    },
    select: {
      user_address: true,
      user_attributes: true,
      user_biogender: true,
      user_typeblood: true,
      user_birth: true,
      user_city: true,
      user_cpf: true,
      user_email: true,
      user_id: true,
      user_gender: true,
      user_name: true,
      user_uf: true,
    }
  });
  if (user) {
    return reply.send(user).status(200);
  } else {
    return reply.send(false).status(200);
  }
})

// Attributes
app.get('/users/attributes', async (request: FastifyRequest, reply: FastifyReply) => {
  const attributes = await prisma.usersAttributes.findMany()
  return reply.send(attributes);
})

app.get('/users/attributes/:page', async (request: FastifyRequest, reply: FastifyReply) => {
  const { page } = request.params as { page: string };
  const attributes = await prisma.usersAttributes.findMany({
    skip: parseInt(page) * 10,
    take: 10,
  })
  return reply.send(attributes);
})

app.get('/users/attributes/count', async (request: FastifyRequest, reply: FastifyReply) => {
  const count = await prisma.usersAttributes.count()
  return reply.send(count);
})

app.post('/users/getuserscandidates/:page', async (request: FastifyRequest, reply: FastifyReply) => {
  const { page } = request.params as { page: string };
  const requestBody = request.body as RequestBody;
  const users = await prisma.institutes_Users.findMany({
    skip: parseInt(page) * 10,
    take: 10,
    where: {
      instituteId: {
        equals: requestBody.instituteId
      }
    }
  })
  return reply.send(users);
})

app.post('/users/getuserscandidates/count', async (request: FastifyRequest, reply: FastifyReply) => {
  const requestBody = request.body as RequestBody;
  const users = await prisma.institutes_Users.count({
    where: {
      instituteId: {
        equals: requestBody.instituteId
      }
    }
  })
  return reply.send(users);
})

app.get('/users/attributes/getattributes/:id', async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  const user = await prisma.users.findFirst({
    where: {
      user_id: {
        equals: id
      }
    }
  });

  let attributes_user: number[] = [];
  if (user?.user_attributes) {
    const parsedAttributes = JSON.parse(user.user_attributes);
    attributes_user = Object.values(parsedAttributes);
    attributes_user = attributes_user.map((value: any) => parseInt(value));
  }

  const attributes = await prisma.usersAttributes.findMany({
    where: {
      attribute_id: {
        in: attributes_user
      }
    }
  })
  return reply.send(attributes);
})

// Institutes

// Counter
app.get('/institutes/count', async (request: FastifyRequest, reply: FastifyReply) => {
  const count = await prisma.intitutes.count()
  return reply.send(count);
})

// Get Institute
app.post('/institutes/getinstitute/', async (request: FastifyRequest, reply: FastifyReply) => {
  const requestBody = request.body as RequestBody;
  const institute = await prisma.intitutes.findFirst({
    where: {
      institute_email: {
        equals: requestBody.email
      }
    },
    select: {
      institute_address: true,
      institute_attributes: true,
      institute_city: true,
      institute_doc: true,
      institute_email: true,
      institute_id: true,
      institute_name: true,
      institute_uf: true,
    }
  });
  if (institute) {
    return reply.send(institute).status(200);
  } else {
    return reply.send(false).status(200);
  }
})


app.get('/institutes/getinstitutes/:page', async (request: FastifyRequest, reply: FastifyReply) => {
  const { page } = request.params as { page: string };
  const institutes = await prisma.intitutes.findMany({
    skip: parseInt(page) * 10,
    take: 10,
  })
  return reply.send(institutes);
})

// Attributes
app.get('/institutes/attributes', async (request: FastifyRequest, reply: FastifyReply) => {
  const attributes = await prisma.instituteAttributes.findMany()
  return reply.send(attributes);
})

app.get('/institutes/attributes/:page', async (request: FastifyRequest, reply: FastifyReply) => {
  const { page } = request.params as { page: string };
  const attributes = await prisma.instituteAttributes.findMany({
    skip: parseInt(page) * 10,
    take: 10,
  })
  return reply.send(attributes);
})

app.get('/institutes/attributes/count', async (request: FastifyRequest, reply: FastifyReply) => {
  const count = await prisma.instituteAttributes.count()
  return reply.send(count);
})

app.get('/institutes/segments/getsegmentname/:id', async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const segment = await prisma.segments.findFirst({
    where: {
      segment_id: {
        equals: parseInt(id)
      }
    }
  })
  return reply.send(segment);
})

app.get('/institutes/attributes/getattributes/:id', async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  const institute = await prisma.intitutes.findFirst({
    where: {
      institute_id: {
        equals: id
      }
    }
  });
  
  let attributes_institute: number[] = [];
  if (institute?.institute_attributes) {
    const parsedAttributes = JSON.parse(institute.institute_attributes);
    attributes_institute = Object.values(parsedAttributes);
    attributes_institute = attributes_institute.map((value: any) => parseInt(value));
  }

  const attributes = await prisma.instituteAttributes.findMany({
    where: {
      attribute_id: {
        in: attributes_institute
      }
    }
  })
  return reply.send(attributes);
})

// Segments
app.get('/institutes/segments', async (request: FastifyRequest, reply: FastifyReply) => {
  const segments = await prisma.segments.findMany()
  return reply.send(segments);
})

app.post('/institutes/getcandidates/', async (request: FastifyRequest, reply: FastifyReply) => {
  const requestBody = request.body as RequestBody;
  
  const candidates = await prisma.institutes_Users.findMany({
    where: {
      instituteId: {
        equals: requestBody.instituteId,
      }
    },
  })

  return reply.status(200).send(candidates);
})

// Send Form User
app.post('/sendformuser/', async (request: FastifyRequest, reply: FastifyReply) => {
  const requestBody = request.body as RequestBody;
  const saltRounds = 10;
  const hashPass = await bcrypt.hash(requestBody.password, saltRounds);

  const userGender: Gender = requestBody.gender as Gender;
  const userBioGender: BioGender = requestBody.biogender as BioGender;

  const user = await prisma.users.create({
    data: {
      user_name: requestBody.name,
      user_cpf: requestBody.cpf,
      user_email: requestBody.email,
      user_typeblood: requestBody.typeblood,
      user_uf: requestBody.uf,
      user_city: requestBody.city,
      user_gender: userGender,
      user_role: 'USER',
      user_biogender: userBioGender,
      user_address: requestBody.address,
      user_birth: new Date(requestBody.birth),
      user_attributes: JSON.stringify(requestBody.attributes),
      user_password: hashPass,
    },
  })
  return reply.status(200).send({ success: true });
})

app.post('/sendformuser/edit/', async (request: FastifyRequest, reply: FastifyReply) => {
  const requestBody = request.body as RequestBody;
  const userGender: Gender = requestBody.gender as Gender;
  const userBioGender: BioGender = requestBody.biogender as BioGender;
  
  const userData = {
    user_name: requestBody.name,
    user_cpf: requestBody.cpf,
    user_email: requestBody.email,
    user_uf: requestBody.uf,
    user_city: requestBody.city,
    user_gender: userGender,
    user_typeblood: requestBody.typeblood,
    user_role: 'USER',
    user_biogender: userBioGender,
    user_address: requestBody.address,
    user_birth: new Date(requestBody.birth),
    user_attributes: JSON.stringify(requestBody.attributes),
  };
  
  let userCreationData: any = { ...userData }; // Modify the type accordingly
  let passHasChanged = false;

  if (requestBody.password !== "") {
    const saltRounds = 10;
    const hashPass = await bcrypt.hash(requestBody.password, saltRounds);
    userCreationData = { ...userData, user_password: hashPass };
    passHasChanged = true;
  }
  
  const user = await prisma.users.update({
    where: {
      user_id: requestBody.id,
    },
    data: userCreationData,
  })

  return reply.status(200).send({ success: true, passChanged: passHasChanged });
})

app.post('/sendformuser/delete/', async (request: FastifyRequest, reply: FastifyReply) => {
  const requestBody = request.body as RequestBody;
  
  const user = await prisma.users.delete({
    where: {
      user_id: requestBody.id,
    },
  })

  return reply.status(200).send({ success: true });
})

app.post('/users/candidate/', async (request: FastifyRequest, reply: FastifyReply) => {
  const requestBody = request.body as RequestBody;
  
  const user = await prisma.institutes_Users.create({
    data: {
      userId: requestBody.userId,
      instituteId: requestBody.instituteId,
    },
  })

  return reply.status(200).send({ success: true });
})

app.post('/users/getcandidates/', async (request: FastifyRequest, reply: FastifyReply) => {
  const requestBody = request.body as RequestBody;
  
  const candidates = await prisma.institutes_Users.findMany({
    where: {
      userId: {
        equals: requestBody.userId,
      }
    },
  })

  return reply.status(200).send(candidates);
})

// Send Form Institute
app.post('/sendforminstitute/', async (request: FastifyRequest, reply: FastifyReply) => {
  const requestBody = request.body as RequestBodyInstitute;
  const saltRounds = 10;
  const hashPass = await bcrypt.hash(requestBody.password, saltRounds);

  const institute = await prisma.intitutes.create({
    data: {
      institute_name: requestBody.name,
      institute_doc: requestBody.cpf,
      institute_desc: requestBody.desc,
      institute_email: requestBody.email,
      institute_uf: requestBody.uf,
      institute_city: requestBody.city,
      institute_role: 'INSTITUTE',
      institute_segment: requestBody.segment,
      institute_address: requestBody.address,
      institute_attributes: JSON.stringify(requestBody.attributes),
      institute_password: hashPass,
    },
  })
  return reply.status(200).send({ success: true });
})

app.post('/sendforminstitute/edit/', async (request: FastifyRequest, reply: FastifyReply) => {
  const requestBody = request.body as RequestBody;
  
  const instituteData = {
    institute_name: requestBody.name,
    institute_doc: requestBody.cpf,
    institute_email: requestBody.email,
    institute_uf: requestBody.uf,
    institute_city: requestBody.city,
    institute_role: 'INSTITUTE',
    institute_address: requestBody.address,
    institute_attributes: JSON.stringify(requestBody.attributes),
  };
  
  let instituteCreationData: any = { ...instituteData }; // Modify the type accordingly
  let passHasChanged = false;

  if (requestBody.password !== "") {
    const saltRounds = 10;
    const hashPass = await bcrypt.hash(requestBody.password, saltRounds);
    instituteCreationData = { ...instituteData, institute_password: hashPass };
    passHasChanged = true;
  }
  
  const institute = await prisma.intitutes.update({
    where: {
      institute_id: requestBody.id,
    },
    data: instituteCreationData,
  })

  return reply.status(200).send({ success: true, passChanged: passHasChanged });
})

app.post('/sendforminstitute/delete/', async (request: FastifyRequest, reply: FastifyReply) => {
  const requestBody = request.body as RequestBody;
  
  const institute = await prisma.intitutes.delete({
    where: {
      institute_id: requestBody.id,
    },
  })

  return reply.status(200).send({ success: true });
})

// Login
app.post('/login/', async (request: FastifyRequest, reply: FastifyReply) => {

  const requestBody = request.body as RequestBody;

  let user = await prisma.users.findFirst({
    where: {
      user_email: {
        equals: requestBody.email
      }
    }
  });

  if (!user) {
    let institute = await prisma.intitutes.findFirst({
      where: {
        institute_email: {
          contains: requestBody.email
        }
      }
    });
    if (institute) {
      const isValidPass = await bcrypt.compare(requestBody.password || '', institute.institute_password);

      if (isValidPass) {

        const tokenPayload = {
          email: institute.institute_email,
          role: institute.institute_role
        };
        const accessToken = jwt.sign(tokenPayload, process.env.SECRET_TOKEN || '');

        reply.status(201).send({
          status: 'success',
          token: accessToken,
        });
      } else {
        return reply.status(200).send({ success: false });
      }
    }
  } else {
    if (user) {
      const isValidPass = await bcrypt.compare(requestBody.password || '', user.user_password);

      if (isValidPass) {

        const tokenPayload = {
          email: user.user_email,
          role: user.user_role
        };
        const accessToken = jwt.sign(tokenPayload, process.env.SECRET_TOKEN || '');

        reply.status(201).send({
          status: 'success',
          token: accessToken,
        });
      } else {
        return reply.status(200).send({ success: false });
      }
    } else {
      return reply.status(200).send({ success: false });
    }
  } 
});

app.get('/verify/', async (request: FastifyRequest, reply: FastifyReply) => {
  const token = request.headers.authorization;
  if (!token) {
    return reply.status(200).send({ status: '0' });
  }
  try {
    const data = jwt.verify(token, process.env.SECRET_TOKEN || '') as JwtPayload;
    if (data) {
      const response = { email: data.email, role: data.role, status: '1' };
      return reply.status(200).send(response);
    }
  } catch (error) {
    return reply.status(200).send({ status: '0' });
  }
});



app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP server running on http://localhost:3333');
})