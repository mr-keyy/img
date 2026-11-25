export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).end();
  console.log("HIT", JSON.stringify(req.body||{}));
  res.status(204).end();
}
