let fontSize, interval, frames, frameIndex = 0, delay = 250;
$(document).ready(function () {
    let fontSize, interval, frames, frameIndex = 0, delay = 250;
    let currentAnimation = ANIMATIONS["blank"];
    let $fontSizeDropdown = $($("#fontsize"));
    let $animationSelect = $($("#animation"));
    let $stopBtn = $($("#stopBtn"));
    let $startBtn = $($("#startBtn"));
    let $textArea = $($("#text-area"));
    updateFontSize();

    function setUpFrames() {
        currentAnimation = $textArea.val();
        return currentAnimation.split("=====\n");
    }

    function updateFontSize() {
        fontSize = $fontSizeDropdown.val();
        $textArea.css('font-size', `${fontSize}px`);
    }

    function runAnimation() {
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(function () {
            $textArea.val(frames[frameIndex++]);
            if (frameIndex >= frames.length) {
                frameIndex = 0;
            }
        }, delay);
    }

    $startBtn.on('click', (e) => {
        $stopBtn.attr('disabled', false);
        $(e.target).attr('disabled', true);
        frames = setUpFrames();
        runAnimation();
    });

    $stopBtn.on('click', () => {
        clearInterval(interval);
        $textArea.val(currentAnimation);
        $startBtn.attr('disabled', false);
        $stopBtn.attr('disabled', true);
        frameIndex = 0;
    });

    $animationSelect.on('change', () => {
        currentAnimation = ANIMATIONS[$animationSelect.val()];
        $textArea.val(currentAnimation);
    });

    $('#turbo').on('change', (event) => {
        if (event.currentTarget.checked) {
            delay = 50;
        } else {
            delay = 250;
        }
        if (interval) runAnimation();
    });

    $fontSizeDropdown.on('change', () => {
        updateFontSize();
    });

});