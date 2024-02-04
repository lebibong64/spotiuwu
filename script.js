let noButton = document.getElementById('noButton');
let yesButton = document.getElementById('yesButton');

let noClickCount = 0;
let initialPosition = { left: 0, top: 0 };

noButton.addEventListener('click', () => {
    ++noClickCount;
    if (noClickCount >= 4) {
        return;
    } else {
        changeBackgroundAndText(); // Change background and display text
    }
});

yesButton.addEventListener('click', () => {
    if (noClickCount < 3) {
        moveYesButton();
    } else {
        clickBtnYes();
    }
});

function moveYesButton() {
    let randomX, randomY;

    do {
        randomX = Math.floor(Math.random() * 70) - 35; // Random value between -35 and 35
        randomY = Math.floor(Math.random() * 70) - 35; // Random value between -35 and 35
    } while (isOverlap(initialPosition, randomX, randomY));

    initialPosition = {
        left: initialPosition.left + randomX,
        top: initialPosition.top + randomY
    };

    yesButton.style.transition = 'transform 1s';
    yesButton.style.transform = `translate(${initialPosition.left}px, ${initialPosition.top}px)`;

    yesButton.disabled = true; // Disable Yes button during animation
    
    setTimeout(() => {
        // Reset the position after animation completes
        yesButton.style.transition = 'none';
        yesButton.style.transform = `translate(${initialPosition.left}px, ${initialPosition.top}px)`;
        yesButton.disabled = false; // Enable Yes button after animation
    }, 1000);
}

function isOverlap(currentPosition, offsetX, offsetY) {
    let noButtonRect = noButton.getBoundingClientRect();
    let newX = currentPosition.left + offsetX;
    let newY = currentPosition.top + offsetY;

    return (
        newX < noButtonRect.right &&
        newX + yesButton.offsetWidth > noButtonRect.left &&
        newY < noButtonRect.bottom &&
        newY + yesButton.offsetHeight > noButtonRect.top
    );
}

function resetYesButtonPosition() {
    currentPosition = { ...initialPosition }; // Copy the initial position
    yesButton.style.transition = 'transform 1s';
    yesButton.style.transform = 'translate(0, 0)'; // Move Yes button back to the initial position
    yesButton.disabled = true; // Disable Yes button during animation

    setTimeout(() => {
        // Reset the position and color after animation completes
        yesButton.style.transition = 'none';
        yesButton.style.transform = 'translate(0, 0)';
        yesButton.disabled = false; // Enable Yes button after animation
    }, 1000);
}

function changeBackgroundAndText() {
    let backgroundUrl, textContent;

    switch (noClickCount) {
        case 1:
            backgroundUrl = 'https://i.ytimg.com/vi/7fAmweEiNBk/maxresdefault.jpg';
            textContent = 'Đừng :< Tớ muốn tìm hiểu cậu mà';
            break;
        case 2:
            backgroundUrl = 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/07/Despicable-Me-Minions-Begging.jpg';
            textContent = 'Xin lỗi vì đợt trước nhắn tin mà tự nhiên tớ lại rụt. Thật sự lúc đấy tớ bị nghĩ nhiều (ngu), sợ rằng mình làm phiền cậu, mong được lượng thứ.';
            break;
        case 3:
            backgroundUrl = 'https://i.ytimg.com/vi/i7-W-ihg3fc/maxresdefault.jpg';
            textContent = 'Không biết là cậu đã biết hôm trước tớ bốc phải lá bài gì chưa, nếu biết rồi vẫn mong cậu cho tớ hẹn cậu một buổi đi chơi để được nói trực tiếp. Pweaseee';
            yesButton.style.backgroundColor = '#4CAF50'; // Set Yes button color to green
            resetYesButtonPosition(); // Reset Yes button position
            break;
    }

    document.body.style.backgroundImage = `url('${backgroundUrl}')`;
    showTextOverlay(textContent);
}

function clickBtnYes() {
    let backgroundUrl = 'https://i.ytimg.com/vi/gPteA8cr6VU/maxresdefault.jpg', 
        textContent = 'Cảm ơn quý khách đã tham gia khảo sát. Btw, tài khoản Spotify của quý khách được gia hạn rồi nhé ^^ Và xin phép được làm nhà tài trợ cho tháng này';

    document.body.style.backgroundImage = `url('${backgroundUrl}')`;
    showTextOverlay(textContent);
}

function showTextOverlay(content) {
    // Create a text overlay element
    let textOverlay = document.createElement('div');
    textOverlay.classList.add('text-overlay');
    textOverlay.textContent = content;

    // Append the text overlay to the body
    document.body.appendChild(textOverlay);
}

// Set the initial position when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initialPosition = {
        left: yesButton.getBoundingClientRect().left,
        top: yesButton.getBoundingClientRect().top
    };
    currentPosition = { ...initialPosition };
});
