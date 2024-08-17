import { Context } from "@netlify/edge-functions";

export default async (req: Request, context: Context) => {
  const body = await req.json();
  const { streamUrl } = body;
  const streamRes = await fetch(streamUrl, {
    headers: {
      "Icy-MetaData": "1",
    },
  });
  const metaInt = streamRes.headers.get("icy-metaint", 0);
  if (metaInt) {
    const reader = streamRes.body!.getReader();
    let byteCounter = 0;
    let metadataLength = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      for (let index = 0; index < value.length; index++) {
        if (byteCounter === parseInt(metaInt)) {
          // metadata block starts here
          metadataLength = value[index] * 16;
          // reset bytecounter
          byteCounter = 0;
          if (metadataLength > 0) {
            const metadata = new TextDecoder().decode(
              value.slice(index + 1, index + 1 + metadataLength)
            );
            console.log(metadata);
            index += metadataLength;
            return new Response(metadata);
          }
        } else {
          byteCounter++;
        }
      }
    }
  }
  return context.next(new Request(req, { body: JSON.stringify(body) }));
};

export const config = { path: "/metadata" };
