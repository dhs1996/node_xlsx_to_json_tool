import * as readline from "readline";
function readSyncByRl(tips) {
    tips = tips || '> ';

    return new Promise<any>((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(tips, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}
export let input = async function (str:string) {
    return new Promise<any>((resolve) => {
        readSyncByRl(str).then((res) => {
            resolve(res);
        });

    });
    
}