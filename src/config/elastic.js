import { Client } from "@elastic/elasticsearch";
import { config } from "dotenv";
config();


export const esClient = new Client({
  nodes: process.env.ES_HOSTS.split(",")
});