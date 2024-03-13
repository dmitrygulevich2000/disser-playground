async function main() {
    await new Promise(r => setTimeout(r, 10000))
}

main().then(() => console.log("10s elapsed"))