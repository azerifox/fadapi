import { prisma } from "../../prisma/instance";
import { NextApiRequest, NextApiResponse } from "next";
import { Participant, PickMemory } from "@prisma/client";

export default async function handle(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "GET") {
    await get(request, response);
  } else if (request.method === "POST") {
    await post(request, response);
  } else {
    response.status(405).end();
  }
}

async function get(request: NextApiRequest, response: NextApiResponse) {
  try {
    const pickMemory = await prisma.pickMemory.findMany();
    console.log(`got pick memory from DB: ${JSON.stringify(pickMemory)}`);
    response.status(200).json({ data: pickMemory });
  } catch (error) {
    response.status(500).json({ error: "failed to load pick memory" });
  }
}

async function post(request: NextApiRequest, response: NextApiResponse) {
  const body = JSON.parse(request.body) as PickRequestBody;

  prisma.pickMemory
    .create({
      data: {
        participantId: body.pickedParticipant.id,
      },
    })
    .then(() => response.status(200))
    .catch((error) => {
      console.log(`prisma error: ${error}`);
      response.status(500);
    });

  response.end();
}

export type PickRequestBody = {
  pickedParticipant: Participant;
};
