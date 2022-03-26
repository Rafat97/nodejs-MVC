const jose = require("node-jose");
const path = require("path");
const fs = require("fs");
const jwkToPem = require("jwk-to-pem");

const dir = `./certs`;
const filePathKeys = `${dir}/keys.json`;
const filePathJWKS = `${dir}/jwks.json`;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const jwkGenerateFunction = async () => {
  if (!fs.existsSync(filePathKeys)) {
    console.log("Generating new key pair...");

    let keyStore = jose.JWK.createKeyStore();
    await keyStore.generate("RSA", 4096, { alg: "RS256", use: "sig" });
    await keyStore.generate("RSA", 4096, { alg: "RS256", use: "sig" });

    fs.writeFileSync(
      filePathKeys,
      JSON.stringify(keyStore.toJSON(true), null, "  ")
    );
    console.log("Completed generating new key pair...");

    console.log("Generating the pem...");
    const key = keyStore.all();
    for (let i = 0; i < key.length; i++) {
      const pemPublic = jwkToPem(key[i].toJSON());
      const pemPrivate = jwkToPem(key[i].toJSON(true), { private: true });
      fs.writeFileSync(`${dir}/public_${i}.pem`, pemPublic);
      fs.writeFileSync(`${dir}/private_${i}.pem`, pemPrivate);
    }

    console.log("Completed generating new pem...");

    console.log("Generating new jwks pair...");
    const ks = fs.readFileSync(filePathKeys);
    const keyStoreNew = await jose.JWK.asKeyStore(ks.toString());
    fs.writeFileSync(
      filePathJWKS,
      JSON.stringify(keyStoreNew.toJSON(), null, "  ")
    );
    console.log("Completed generating new jwks pair...");
  } else {
    console.log("Already exists keys");
  }
};

jwkGenerateFunction();
