document.addEventListener("DOMContentLoaded", function () {
    const buffer = document.querySelector('.buffer .item');
    let isProducing = true;

    function produce() {
        buffer.style.opacity = '1';
        buffer.style.width = '20px';
        buffer.style.height = '20px';
        buffer.style.backgroundColor = '#00f';
        setTimeout(() => {
            buffer.style.opacity = '0';
        }, 1000);
    }

    function consume() {
        if (buffer.style.opacity === '1') {
            buffer.style.opacity = '0';
            buffer.style.width = '0';
            buffer.style.height = '0';
        }
    }

    function startProducerConsumer() {
        setInterval(() => {
            if (isProducing) {
                produce();
                isProducing = false;
            } else {
                consume();
                isProducing = true;
            }
        }, 2000);
    }

    startProducerConsumer();
});
