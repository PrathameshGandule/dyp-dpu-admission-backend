global.logd = (logString) => {
    const node_env = process.env.NODE_ENV;
    if(!node_env){
        console.log("Please specify the NODE_ENV in .env file as dev or other")
        return;
    }
    if(node_env === "dev"){
        console.log(logString);
    } else {
        return;
    }
}
