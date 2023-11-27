const list_menu = [
    {
        id: "raven-stone2",
        type: "server",
        category: "build",
        act: ""
    },
    {
        id: "raven-stone2",
        type: "server",
        category: "log",
        act: ""
    },
    {
        id: "auto-push",
        type: "local",
        category: "git",
        act: ""

    }
]

function groupBy(array, key) {
    return array.reduce((result, currentItem) => {
        const keyValue = currentItem[key];
        if (!result[keyValue]) {
            result[keyValue] = [];
        }

        result[keyValue].push(currentItem);

        return result;
    }, {});
}

function main() {
    console.log(groupBy(list_menu, "type"))
}

main()