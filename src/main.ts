import * as x from "xlsx";
import { input } from "./lib/readline"
import * as fs from "fs";
let app = async () => {
    let path: string = await input('请输入文件路径：');
    let d: x.WorkBook;
    try {
        d = x.readFile(path);
    } catch (error) {
        console.log('不存在该文件或者格式不对，清重新输入');
        app();
        return;
    }
    for (const key in d.Sheets) {
        let list = {};
        let cfg = d.Sheets[key];
        let keys = Object.keys(cfg);
        const alist = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        keys = keys.filter((a) => {
            return a[0] != '!';
        });
        let idlist = keys.filter((a) => {
            return a[0] == 'A';
        });
        for (let i = 2; i <= idlist.length; i++) {
            list[cfg['A' + i].v] = {};
            for (let j = 0; j < keys.length / idlist.length; j++) {
                if (j == 0) {
                    list[cfg['A' + i].v][cfg[alist[j] + 1].v] = cfg[alist[j] + i].w;
                } else {
                    let value = cfg[alist[j] + i].v;
                    if (value.indexOf('[') > -1 || value.indexOf('{') > -1) {
                        value = JSON.parse(value);
                    }
                    list[cfg['A' + i].v][cfg[alist[j] + 1].v] = value;
                }
            }
        }
        let idx = path.lastIndexOf('\\');
        fs.writeFile(path.substr(0, idx) + '\\' + key + '.json', JSON.stringify(list), (d) => {
            console.log('成功生成文件：' + key + '.json');
        });
    }
}
app();
