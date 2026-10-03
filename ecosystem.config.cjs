module.exports = { apps:[{
  name:'gemtalk', cwd:__dirname, script:'server.js',
  env:{ PORT:process.env.PORT || '3000', AGY_MODEL:process.env.AGY_MODEL || 'gemini-3.8-flash-low' },
  time:true, max_memory_restart:'350M', kill_timeout:5000
}] };
