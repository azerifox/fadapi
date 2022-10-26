import { prisma } from "../../prisma/instance";
import { NextApiRequest, NextApiResponse } from "next";

export default async function get(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const participants = await prisma.participant.findMany();
    response.status(200).json({ participants });
  } catch (error) {
    response.status(500).json({ error: "failed to load participants" });
  }
}
