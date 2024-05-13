var playerName = '', level = 1, gameTime = 0, correctCount = 0, wrongCount = 0, displayTime = 0, maxCirclesNumber = 0, remainingTime = 0;
var timerInterval;
var gameContentDiv = document.getElementById('game-content');



// نصف قطر الدائرة 
const RADIUS = {
    1: 40,
    2: 30,
    3: 20
};


// مدة ظهور الارقام بالثواني
const LEVEL_DURATION = {
    1: 3,
    2: 2,
    3: 1.5
};

// عدد الكرات لكل مستوى
const Level_Number_Circles = {
    1: 2,
    2: 2,
    3: 2
};



if (gameContentDiv.childElementCount === 0) {
    Start_Game_Info();
}


function Start_Game_Info(uplevel = '') {

    let tempName = playerName;

    gameContentDiv.innerHTML = "";

    playerName = ''; displayTime = 0; gameTime = 0;
    correctCount = 0; wrongCount = 0; maxCirclesNumber = 0; remainingTime = 0;

    clearInterval(timerInterval);

    if (uplevel == 'up' && level < 3) {
        level++;
    } else {
        level = 1
    }

    document.getElementById("floating-timer").innerHTML = '';

    var container_Div_Start = document.createElement('div');
    container_Div_Start.classList.add('container-fluid', 'vh-100', 'd-flex', 'justify-content-center', 'align-items-center');

    var col_Div1_Start = document.createElement('div');
    col_Div1_Start.classList.add('col-lg-4', 'col-md-6');

    var card_Div_Start = document.createElement('div');
    card_Div_Start.id = 'gameSetup';
    card_Div_Start.classList.add('card');

    var card_Header_Div_Start = document.createElement('div');
    card_Header_Div_Start.classList.add('card-header');

    var card_Title_Start = document.createElement('h2');
    card_Title_Start.classList.add('card-title');
    card_Title_Start.textContent = 'إعداد اللعبة';

    var card_Body_Div_Start = document.createElement('div');
    card_Body_Div_Start.classList.add('card-body');

    var card_Sub_Title_Strat = document.createElement('h5');
    card_Sub_Title_Strat.classList.add('card-title');
    card_Sub_Title_Strat.textContent = 'يرجى ادخال البيانات.';

    var row_Div_Start = document.createElement('div');
    row_Div_Start.classList.add('row');

    var left_Div_Start = document.createElement('div');
    left_Div_Start.classList.add('col-lg-2');

    var col_Div2_Start = document.createElement('div');
    col_Div2_Start.classList.add('col-lg-8');

    var right_Div_Start = document.createElement('div');
    right_Div_Start.classList.add('col-lg-2');

    var form_Element_Start = document.createElement('form');
    form_Element_Start.id = 'gameSetupForm';

    var name_Label_Start = document.createElement('label');
    name_Label_Start.setAttribute('for', 'playerName');
    name_Label_Start.classList.add('form-label', 'mt-4');
    name_Label_Start.textContent = 'الاسم:';

    var name_Input_Start = document.createElement('input');
    name_Input_Start.required = true;
    name_Input_Start.type = 'text';
    name_Input_Start.classList.add('form-control');
    name_Input_Start.id = 'playerName';
    name_Input_Start.value = tempName

    var level_Label_Start = document.createElement('label');
    level_Label_Start.setAttribute('for', 'level');
    level_Label_Start.classList.add('form-label', 'mt-4');
    level_Label_Start.textContent = 'المستوى:';

    var level_Select_Start = document.createElement('select');
    level_Select_Start.required = true;
    level_Select_Start.id = 'level';
    level_Select_Start.classList.add('form-select');

    var level_Options_Start = ['المستوى 1', 'المستوى 2', 'المستوى 3'];

    level_Options_Start.forEach(function (optionText, index) {

        var option = document.createElement('option');
        option.value = index + 1;
        option.text = optionText;

        if (index + 1 == level) {
            option.selected = true;
        }

        level_Select_Start.appendChild(option);
    });

    var time_Label_Start = document.createElement('label');
    time_Label_Start.setAttribute('for', 'gameTime');
    time_Label_Start.classList.add('form-label', 'mt-4');
    time_Label_Start.textContent = 'المدة الزمنية (ثواني):';

    var time_Start_Input = document.createElement('input');
    time_Start_Input.required = true;
    time_Start_Input.type = 'number';
    time_Start_Input.classList.add('form-control');
    time_Start_Input.id = 'gameTime';
    time_Start_Input.min = '1';
    time_Start_Input.value = '30';

    var col_Div3_Start = document.createElement('div');
    col_Div3_Start.classList.add('col-lg-12');
    col_Div3_Start.style.textAlign = "center";

    var start_Button = document.createElement('button');
    start_Button.type = 'button';
    start_Button.classList.add('btn', 'btn-success', 'mt-4');
    start_Button.textContent = 'بدء اللعبة';
    start_Button.onclick = Save_And_Start_Game;

    gameContentDiv.appendChild(container_Div_Start);
    container_Div_Start.appendChild(col_Div1_Start);
    col_Div1_Start.appendChild(card_Div_Start);
    card_Div_Start.appendChild(card_Header_Div_Start);
    card_Header_Div_Start.appendChild(card_Title_Start);
    card_Div_Start.appendChild(card_Body_Div_Start);
    card_Body_Div_Start.appendChild(card_Sub_Title_Strat);
    card_Body_Div_Start.appendChild(row_Div_Start);
    row_Div_Start.appendChild(right_Div_Start);
    row_Div_Start.appendChild(col_Div2_Start);
    row_Div_Start.appendChild(left_Div_Start);
    col_Div2_Start.appendChild(form_Element_Start);
    form_Element_Start.appendChild(name_Label_Start);
    form_Element_Start.appendChild(name_Input_Start);
    form_Element_Start.appendChild(level_Label_Start);
    form_Element_Start.appendChild(level_Select_Start);
    form_Element_Start.appendChild(time_Label_Start);
    form_Element_Start.appendChild(time_Start_Input);
    form_Element_Start.appendChild(col_Div3_Start);
    col_Div3_Start.appendChild(start_Button);
}


function Save_And_Start_Game() {

    playerName = document.getElementById("playerName").value;
    level = document.getElementById("level").value;
    gameTime = document.getElementById("gameTime").value;

    remainingTime = parseInt(gameTime);

    if (playerName.trim() === '' || gameTime.trim() === '' || level.trim() === '') {

        playerName = ''; gameTime = ''; level = '';

        Swal.fire({
            icon: 'error',
            title: 'يرجى ملء جميع الحقول.',
            text: '',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'حسناً'
        });

        runAudio('F');

        return false;
    }


    runAudio('T');

    var overlay = document.getElementById("overlay");
    overlay.style.display = "block";

    setTimeout(() => {
        overlay.style.display = "none";
        Game_Board();

        displayTime = LEVEL_DURATION[level];

        startGame();

        updateTimerDisplay();

        timerInterval = setInterval(() => {
            remainingTime--;
            updateTimerDisplay();

            if (remainingTime <= 0) {
                clearInterval(timerInterval);
                Display_Result();
            }
        }, 1000);

    }, 1700);
}



function Game_Board() {

    gameContentDiv.innerHTML = "";

    var gameDiv = document.createElement('div');
    gameDiv.classList.add('game');

    var containerDiv = document.createElement('div');
    containerDiv.classList.add('container');
    containerDiv.style.direction = "ltr";
    containerDiv.style.paddingBottom = "10px";

    var row1Div = document.createElement('div');
    row1Div.classList.add('row');

    var btnReplayDiv = document.createElement('div');
    btnReplayDiv.classList.add('col-md-2', 'info');
    btnReplayDiv.id = 'btn-replay';
    var replayButton = document.createElement('button');
    replayButton.type = 'submit';
    replayButton.classList.add('btn', 'btn-outline-warning');
    replayButton.textContent = ' اعادة ';
    replayButton.style.marginLeft = "6px";
    replayButton.innerHTML += '<i class="fa fa-refresh"></i>';
    replayButton.addEventListener('click', Start_Game_Info);
    var resultButton = document.createElement('button');
    resultButton.type = 'submit';
    resultButton.classList.add('btn', 'btn-success');
    resultButton.textContent = ' النتيجة ';
    resultButton.innerHTML += '<i class="fa fa-check"></i>';
    resultButton.addEventListener('click', Display_Result);
    btnReplayDiv.appendChild(replayButton);
    btnReplayDiv.appendChild(resultButton);

    var remainingTimeDiv = document.createElement('div');
    remainingTimeDiv.classList.add('col-md-2', 'info');
    remainingTimeDiv.id = 'remainingTime';

    var gameTimeDiv = document.createElement('div');
    gameTimeDiv.classList.add('col-md-2', 'info');
    gameTimeDiv.id = 'gameTime';
    gameTimeDiv.innerHTML = `المدة : <span style="color:#4caf50;font-weight: bold;">${gameTime} ثانية</span>`;

    var gamerLevelDiv = document.createElement('div');
    gamerLevelDiv.classList.add('col-md-2', 'info');
    gamerLevelDiv.id = 'gamerLevel';
    gamerLevelDiv.innerHTML = `المستوى : <span style="color:#4caf50;font-weight: bold;">${level}</span>`;

    var playerNameDiv = document.createElement('div');
    playerNameDiv.classList.add('col-md-4', 'info');
    playerNameDiv.id = 'playerName';
    playerNameDiv.innerHTML = `الاسم : <span style="color:#4caf50;font-weight: bold;">${playerName}</span>`;

    row1Div.appendChild(btnReplayDiv);
    row1Div.appendChild(remainingTimeDiv);
    row1Div.appendChild(gameTimeDiv);
    row1Div.appendChild(gamerLevelDiv);
    row1Div.appendChild(playerNameDiv);

    var row2Div = document.createElement('div');
    row2Div.classList.add('row');

    var gameBoardDiv = document.createElement('div');
    gameBoardDiv.classList.add('col-lg-6', 'col-md-8');
    gameBoardDiv.id = 'gameBoard';

    row2Div.appendChild(gameBoardDiv);

    containerDiv.appendChild(row1Div);
    containerDiv.appendChild(row2Div);

    gameDiv.appendChild(containerDiv);

    gameContentDiv.appendChild(gameDiv);

}


function Display_Result() {

    clearInterval(timerInterval);

    gameContentDiv.innerHTML = "";
    document.getElementById("floating-timer").innerHTML = '';

    gameContentDiv.innerHTML = "";

    var resultDiv = document.createElement('div');
    resultDiv.classList.add('Result');

    var cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'r-container');
    cardDiv.id = 'result-card';

    var title = document.createElement('h2');
    title.classList.add('card-title', 'card-header', 'result-title');
    title.textContent = 'النتيجة';
    if (correctCount < wrongCount) {
        title.style.backgroundColor = "red";
    }

    var rowDiv = document.createElement('div');
    rowDiv.classList.add('row', 'result-info');

    var playerNameDiv = document.createElement('div');
    playerNameDiv.classList.add('col-12');
    playerNameDiv.style.textAlign = "center";

    var playerNameParagraph = document.createElement('p');
    var playerNameSpan = document.createElement('span');
    playerNameSpan.id = 'r_playerName';
    playerNameSpan.textContent = playerName;
    playerNameSpan.classList.add("result-elements");
    playerNameParagraph.appendChild(playerNameSpan);

    playerNameDiv.appendChild(playerNameParagraph);

    var resultInfoDiv1 = document.createElement('div');
    resultInfoDiv1.classList.add('col-6');
    resultInfoDiv1.innerHTML = `
    <p><strong>المدة :</strong> <span id="r_GameTime" class="result-elements">${gameTime} ثانية </span></p>
    <p><strong>عدد الجولات:</strong> <span id="r_orundCount" class="result-elements">${wrongCount + correctCount}</span></p>
    <p><strong>الاختبارات الصحيحة:</strong> <span id="r_correctCount" class="result-elements">${correctCount}</span></p>
    <p><strong>الاختبارات الخاطئة:</strong> <span id="r_wrongCount" class="result-elements" style="color:red">${wrongCount}</span></p>
    <p><strong>اقصى عدد للدوائر:</strong> <span id="r_maxCircles" class="result-elements">${maxCirclesNumber}</span></p>
`;

    var resultInfoDiv2 = document.createElement('div');
    resultInfoDiv2.classList.add('col-6');
    var roundedImageDiv = document.createElement('div');
    roundedImageDiv.classList.add('rounded-image');
    var resImg = document.createElement('img');
    resImg.id = 'res-img';

    if (correctCount >= wrongCount) {

        resImg.src = 'Images/win.png';
        resImg.style.border = "3px green solid"

        runAudio("rs");
    } else {
        resImg.src = 'Images/lose.png';
        resImg.style.border = "3px red solid"
        runAudio("rf");
    }

    resImg.alt = 'صورة';
    resImg.classList.add('img-fluid', 'rounded-circle', "img");
    roundedImageDiv.appendChild(resImg);
    resultInfoDiv2.appendChild(roundedImageDiv);

    var btnReplayDiv = document.createElement('div');
    btnReplayDiv.classList.add('col-12', 'mt-3', 'btn-replay');
    btnReplayDiv.style.textAlign = "center";

    var replayButton = document.createElement('button');
    replayButton.classList.add('btn', 'btn-warning');
    replayButton.style.marginLeft = "6px";
    replayButton.innerHTML = '<i class="fa fa-refresh"></i> إعادة المحاولة';
    replayButton.addEventListener('click', Start_Game_Info);

    btnReplayDiv.appendChild(replayButton);

    if (correctCount >= wrongCount) {
        var nextLevelButton = document.createElement('button');
        nextLevelButton.classList.add('btn', 'btn-success');
        nextLevelButton.innerHTML = '<i class="fa fa-arrow-up"></i> المستوى التالي';
        nextLevelButton.addEventListener('click', () => { Start_Game_Info('up'); });

        btnReplayDiv.appendChild(nextLevelButton);
    }

    rowDiv.appendChild(playerNameDiv);
    rowDiv.appendChild(resultInfoDiv1);
    rowDiv.appendChild(resultInfoDiv2);
    cardDiv.appendChild(title);
    cardDiv.appendChild(rowDiv);
    cardDiv.appendChild(btnReplayDiv);
    resultDiv.appendChild(cardDiv);

    gameContentDiv.appendChild(resultDiv);

}




function startGame(circlesNum = Level_Number_Circles[level]) {

    if (circlesNum < Level_Number_Circles[level]) { circlesNum = Level_Number_Circles[level] }

    maxCirclesNumber = Math.max(maxCirclesNumber, circlesNum);


    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    const numCircles = circlesNum; 

    const boardWidth = window.innerWidth / 1.3;
    const boardHeight = window.innerHeight / 1.3;
    const boardTop = (window.innerHeight - boardHeight) / 2 + (boardHeight / 12);
    const boardLeft = (window.innerWidth - boardWidth) / 2;

    gameBoard.style.position = 'fixed';
    gameBoard.style.width = `${boardWidth}px`;
    gameBoard.style.height = `${boardHeight}px`;
    gameBoard.style.top = `${boardTop}px`;
    gameBoard.style.left = `${boardLeft}px`;
    gameBoard.style.border = '2px black solid';

    // قائمة لتخزين  الكرات المضافة 
    const circles = []; 
    // قائمة لتخزين الكرات المضافة حتى الآن
    const circlesNumbers = []; 
    // قائمة لتخزين معلومات الكرات المضافة حتى الآن
    const circlesSelected = []; 
    //  لتحديد إمكانية النقر على الكرات
    let clickable = false; 

    // إضافة الكرات إلى لوحة اللعب
    for (let i = 0; i < numCircles; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.id = i + 1;
        circle.innerText = i + 1;
        circle.style.width = `${2 * RADIUS[level]}px`; // تعيين عرض الدائرة
        circle.style.height = `${2 * RADIUS[level]}px`; // تعيين ارتفاع الدائرة
        circle.style.borderRadius = '50%'; // جعل الدائرة دائرية
        circle.style.fontSize = `${RADIUS[level] * 0.8}px`; // تعيين حجم النص بنسبة معينة من نصف قطر الدائرة

        // تعيين لون الكرة بشكل عشوائي
        const randomColor = getRandomColor();
        circle.style.backgroundColor = randomColor;

        // توليد موقع عشوائي للكرة
        let validPosition = false;
        let left, top;
        while (!validPosition) {
            left = Math.floor(Math.random() * (boardWidth - 3 * RADIUS[level]));
            top = Math.floor(Math.random() * (boardHeight - 3 * RADIUS[level]));

            // التحقق من عدم تداخل الكرة مع الكرات الأخرى
            validPosition = true;
            for (const otherCircle of circles) {
                const otherLeft = otherCircle.offsetLeft;
                const otherTop = otherCircle.offsetTop;
                const distance = Math.sqrt(Math.pow(left - otherLeft, 2) + Math.pow(top - otherTop, 2));
                if (distance < 2 * RADIUS[level]) {
                    validPosition = false;
                    break;
                }
            }
        }

        // تعيين موقع الكرة
        circle.style.position = 'absolute';
        circle.style.left = `${left}px`;
        circle.style.top = `${top}px`;

        // إضافة الكرة إلى لوحة اللعب وإلى قائمة الكرات
        gameBoard.appendChild(circle);
        circles.push(circle);
        circlesNumbers.push(circle.innerHTML);

        // إزالة الرقم من الكرة بعد انتهاء المدة المحددة
        setTimeout(() => {
            circle.innerText = '';
            clickable = true; // تفعيل إمكانية النقر عند اختفاء الأرقام
        }, displayTime * 1000);

        // إضافة معالج النقر على الكرة
        circle.addEventListener('click', () => {
            if (clickable) {
                runAudio('c');
                circles.pop(circle);
                gameBoard.removeChild(circle);
                circlesSelected.push(circle.id);
            }

            checkStatus(circles, circlesNumbers, circlesSelected, circlesNum);
        });
    }

}


function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function checkStatus(circles, circlesNumbers, circlesSelected, circlesNum) {

    const subNumbers = circlesNumbers.slice(0, circlesSelected.length);

    if (JSON.stringify(circlesSelected) != JSON.stringify(subNumbers)) {

        runAudio('F');

        startGame(--circlesNum);
        wrongCount++;
    }

    if (circles.length == 0) {
        if (JSON.stringify(circlesNumbers) == JSON.stringify(circlesSelected)) {

            runAudio('S');

            startGame(++circlesNum);

            correctCount++;

        } else {

            runAudio('F');

            startGame(--circlesNum);
            wrongCount++;
        }
    }
}


function updateTimerDisplay() {
    const timerElement = document.getElementById("remainingTime");
    const floating_timer = document.getElementById("floating-timer");
    const seconds = remainingTime;
    if (seconds > 15) {
        timerElement.innerHTML = `الوقت المتبقي: <span style="color:#4caf50;font-weight: bold;">${seconds}</span>`;
        floating_timer.innerHTML = `الوقت المتبقي: <span style="color:#4caf50;font-weight: bold;">${seconds}</span>`;
    } else if (seconds <= 15 && seconds > 10) {
        timerElement.innerHTML = `الوقت المتبقي: <span style="color:#ffa000;font-weight: bold;">${seconds}</span>`;
        floating_timer.innerHTML = `الوقت المتبقي: <span style="color:#ffa000;font-weight: bold;">${seconds}</span>`;
    } else {
        timerElement.innerHTML = `الوقت المتبقي: <span style="color:red;font-weight: bold;">${seconds}</span>`;
        floating_timer.innerHTML = `الوقت المتبقي: <span style="color:red;font-weight: bold;">${seconds}</span>`;
    }
}


function runAudio(type) {
    if (type === 'S') {
        var audio1 = document.getElementById("myAudio1");
        audio1.play();
    }
    if (type === 'F') {
        var audio2 = document.getElementById("myAudio2");
        audio2.play();
    }

    if (type === 'T') {
        var audio3 = document.getElementById("myAudio3");
        audio3.play();
    }
    if (type === 'c') {
        var clickAtdio = document.getElementById("clickAtdio");
        clickAtdio.play();
    }

    if (type === 'rs') {
        var clickAtdio = document.getElementById("result_success");
        clickAtdio.play();
    }
    if (type === 'rf') {
        var clickAtdio = document.getElementById("result_faild");
        clickAtdio.play();
    }

}
