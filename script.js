// 用于存储从文件中读取的命令和对应返回结果的对象
const commandMap = {};

// 读取command.txt文件内容并解析
fetch('./commands.txt')
 .then(response => response.text())
 .then(text => {
    const lines = text.split('\n');
    lines.forEach(line => {
      const parts = line.split(':');
      if (parts.length === 2) {
        const command = parts[0].trim();
        const result = parts[1].trim();
        commandMap[command] = result;
      }
    });
  })
 .catch(error => console.error('Error reading command.txt file:', error));


document.addEventListener('DOMContentLoaded', function () {
  const commandInput = document.getElementById('command-input');
  const enterButton = document.getElementById('enter-button');
  const consoleOutput = document.querySelector('.console-output');
  const dosConsole = document.querySelector('.dos-console');
  init();

  enterButton.addEventListener('click', handleCommand);
  commandInput.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      handleCommand();
    }
  });
  
  

  function handleCommand() {
    const inputCommand = commandInput.value.trim();
    let outputMessage = '';
    if (inputCommand === 'help' || inputCommand === '?' || inputCommand === '？') {
      outputMessage = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BenDOS     帮助列表&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>===================================<br>· color - 更改控制台颜色<br>· return - 复读机，复读你的内容<br>· contact - 联系作者(虽然好像github可以直接issue';
    } else if (commandMap.hasOwnProperty(inputCommand)) {
      outputMessage = commandMap[inputCommand];
    } else if (inputCommand.startsWith('color ')) {
      const colorCodes = inputCommand.split(' ')[1];
      if (colorCodes.length === 2) {
        const backgroundColorCode = colorCodes[1];
        const foregroundColorCode = colorCodes[0];
        const backgroundColor = getColorFromCode(backgroundColorCode);
        const foregroundColor = getColorFromCode(foregroundColorCode);
        if (backgroundColor && foregroundColor) {
          dosConsole.style.backgroundColor = backgroundColor;
          consoleOutput.style.color = foregroundColor;
          commandInput.style.color = foregroundColor;
          outputMessage = '颜色已改变.';
        } else {
          outputMessage = '未知的颜色代码.';
        }
      } else {
        outputMessage = '颜色命令格式无效.使用 “color [fb]”，其中 f 是前景，b 是背景颜色代码.';
      }
    } else if (inputCommand === 'colorclear') {
        dosConsole.style.backgroundColor = 'black';
        consoleOutput.style.color = 'green';
        commandInput.style.color = 'green';
        outputMessage = '控制台风格已重置';
    } else if (inputCommand === 'awa') {
      outputMessage = 'Ciallo～ (∠・ω< )⌒☆';
    } else if (inputCommand === '原神启动') {
      window.open('genshin.html')
      outputMessage = '启动~'
    } else if (inputCommand === 'color') {
      outputMessage = '您可以使用 “color [fb]”来修改控制台风格，其中 f 是前景，b 是背景颜色代码.'
    } else if (inputCommand === 'return') {
      outputMessage = '请输入内容.格式“return [contect].'
    } else if (inputCommand.startsWith('return ')) {
      const retMsg = inputCommand.split(' ')[1];
      outputMessage = retMsg;
    } else if (inputCommand.startsWith('contact')) {
      outputMessage = 'Blog:Benxpawa.github.io<br>QQ:807684480<br>Mail:Benxp@foxmail.com'
    } else if(inputCommand === 'dir') {
      // 获取当前日期
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const amPm = currentDate.getHours() < 12? 'AM' : 'PM';
      outputMessage = `${year}/${month}/${day}  ${hours}:${minutes} ${amPm}    <DIR>          BenDOS<br>${day}/${month}/${year}  ${hours}:${minutes} ${amPm}    <DIR>          &copy Copyrights 2024 BenDOS.All Rights Reserved. `;
    } else if (inputCommand.startsWith('start ')) {
      const filePath = inputCommand.split(' ')[1];
      // 尝试在浏览器中打开文件（这里仅适用于能在浏览器直接访问的资源，如网页链接等，本地文件访问受浏览器安全策略限制）
      window.open(filePath);
      outputMessage = `Trying to open ${filePath}...`;
    } else if(inputCommand === '') {
        outputMessage = '输入内容啊喂！';
    } else {
      outputMessage = `未知的命令：'${inputCommand}'.您可以输入help或?来获取帮助`;
    }
    const newOutputLine = document.createElement('p');
    newOutputLine.textContent = `Return BenDOS\\root\\>${inputCommand}`;
    const resultOutputLine = document.createElement('p');
    // 将outputMessage中的换行标签替换为HTML中的换行元素，以便正确显示换行效果
    resultOutputLine.innerHTML = outputMessage.replace(/<br>/g, '<br>');
    consoleOutput.appendChild(newOutputLine);
    consoleOutput.appendChild(resultOutputLine);
    commandInput.value = '';

    const scrollableElement = consoleOutput.scrollHeight > consoleOutput.clientHeight
   ? consoleOutput
      : consoleOutput.firstElementChild;
    scrollableElement.scrollTop = scrollableElement.scrollHeight;
  }

  function getColorFromCode(code) {
    const colors = {
      '0': 'black',
      '1': 'blue',
      '2': 'green',
      '3': 'lightgreen',
      '4': 'red',
      '5': 'purple',
      '6': 'yellow',
      '7': 'white',
      '8': 'gray',
      '9': 'lightblue',
      'A': 'lightgreen',
      'B': 'lightaqua',
      'C': 'lightred',
      'D': 'lightpurple',
      'E': 'lightyellow',
      'F': 'brightwhite'
    };
    return colors[code.toUpperCase()]? `rgb(${getRGBFromColorName(colors[code.toUpperCase()])})` : null;
  }

  function getRGBFromColorName(colorName) {
    const colorMap = {
      'black': '0,0,0',
      'blue': '0,0,255',
      'green': '0,128,0',
      'lightgreen': '128,255,128',
      'red': '255,0,0',
      'purple': '128,0,128',
      'yellow': '255,255,0',
      'white': '255,255,255',
      'gray': '128,128,128',
      'lightblue': '128,128,255',
      'lightaqua': '128,255,255',
      'lightred': '255,128,128',
      'lightpurple': '255,128,255',
      'lightyellow': '255,255,128',
      'brightwhite': '255,255,255'
    };
    return colorMap[colorName];
  }
})

// 设置尺寸
    document.addEventListener('DOMContentLoaded', function () {
      const dosConsole = document.querySelector('.dos-console');
      dosConsole.style.width = '1200px';
      dosConsole.style.height = '700px';
    });
    
function init() {
    //更新控制台信息
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const amPm = currentDate.getHours() < 12? 'AM' : 'PM';
      outputMessage = `${year}/${month}/${day}  ${hours}:${minutes} ${amPm}    <DIR>          BenDOS<br>${day}/${month}/${year}  ${hours}:${minutes} ${amPm}     <br>仅供学习交流    <br><br>&copy Copyrights 2024 BenDOS.All Rights Reserved. `;
  var pElement = document.getElementById('msg');
  pElement.innerHTML = outputMessage;
  }
    
