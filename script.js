// List of available images
const imageList = [
    '0038510642.png',
    '0041911534.png',
    '0058611316.png',
    '0068211642.png',
    '0079211609.png',
    '00854611416.png',
    '0100610842.png',
    '0129411342.png',
    '0130011409.png',
    '0135431144.png',
    '0160711316.png',
    '0173911142.png',
    '02131411416.png',
    '0218110609.png',
    '0225911034.png',
    '0230911016.png',
    '0266219743.png',
    '0335311009.png',
    '0354931509.png',
    '0377211409.png',
    '0382711402.png',
    '03881311316.png',
    '0411430734.png',
    '0420610434.png',
    '0430711234.png',
    '0433711535.png',
    '0440010434.png',
    '0447511216.png',
    '0450210626.png',
    '0481610809.png',
    '05190411416.png',
    '0554439834.png',
    '0641311128.png',
    '0642810644.png',
    '0656410034.png',
    '0708910234.png',
    '0726811209.png',
    '0765519716.png',
    '0802011234.png',
    '0823610509.png',
    '0864711134.png',
    '08749911416.png',
    '0917111309.png',
    '09218911416.png',
    '0992111509.png',
    '1001111309.png',
    '10182211216.png',
    '1076511509.png',
    '10781711216.png',
    '1096011509.png',
    '1096610509.png',
    '11020011216.png',
    '1123111409.png',
    '1424211116.png',
    '1539510909.png',
    '1684711309.png',
    '1750711209.png',
    '1769211309.png',
    '1789211409.png',
    '1805211309.png',
    '2021311216.png',
    '2109810816.png',
    '2567411209.png',
    '2963211116.png',
    '3185210716.png',
    '3873810916.png',
    '4532711216.png',
    '4815411116.png',
    '5116811016.png',
    '6364511116.png',
    '7724311216.png',
    '8158211216.png',
    '8700611216.png',
    '9029211216.png',
    '9176811216.png'
];

// DOM elements
const imageSelect = document.getElementById('imageSelect');
const predictBtn = document.getElementById('predictBtn');
const clearBtn = document.getElementById('clearBtn');
const inputImage = document.getElementById('inputImage');
const outputImage = document.getElementById('outputImage');
const inputPlaceholder = document.getElementById('inputPlaceholder');
const outputPlaceholder = document.getElementById('outputPlaceholder');

// Initialize dropdown with image list
function initializeDropdown() {
    imageList.forEach(imageName => {
        const option = document.createElement('option');
        option.value = imageName;
        option.textContent = imageName;
        imageSelect.appendChild(option);
    });
}

// Handle image selection
imageSelect.addEventListener('change', function () {
    const selectedImage = this.value;

    if (selectedImage) {
        // Show input image preview
        inputImage.src = `image_input/${selectedImage}`;
        inputImage.classList.add('show');
        inputPlaceholder.classList.add('hidden');

        // Enable predict button
        predictBtn.disabled = false;

        // Reset output
        outputImage.classList.remove('show');
        outputPlaceholder.classList.remove('hidden');
    } else {
        // Reset everything
        inputImage.classList.remove('show');
        inputPlaceholder.classList.remove('hidden');
        outputImage.classList.remove('show');
        outputPlaceholder.classList.remove('hidden');
        predictBtn.disabled = true;
    }
});

// Handle predict button click
predictBtn.addEventListener('click', function () {
    const selectedImage = imageSelect.value;

    if (!selectedImage) {
        return;
    }

    // Show loading state
    predictBtn.classList.add('loading');
    predictBtn.disabled = true;

    // Simulate processing delay for better UX
    setTimeout(() => {
        // Load output image
        outputImage.src = `image_output/${selectedImage}`;
        outputImage.onload = function () {
            // Show output image
            outputImage.classList.add('show');
            outputPlaceholder.classList.add('hidden');

            // Reset button state
            predictBtn.classList.remove('loading');
            predictBtn.disabled = false;

            // Smooth scroll to output
            outputImage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        };

        outputImage.onerror = function () {
            alert('Error loading output image. Please try again.');
            predictBtn.classList.remove('loading');
            predictBtn.disabled = false;
        };
    }, 500);
});

// Function to clear all images
function clearAll() {
    // Remove any existing event handlers from images
    outputImage.onload = null;
    outputImage.onerror = null;
    inputImage.onload = null;
    inputImage.onerror = null;

    // Reset input
    inputImage.classList.remove('show');
    inputImage.src = '';
    inputPlaceholder.classList.remove('hidden');

    // Reset output
    outputImage.classList.remove('show');
    outputImage.src = '';
    outputPlaceholder.classList.remove('hidden');

    // Reset dropdown
    imageSelect.value = '';

    // Disable predict button
    predictBtn.disabled = true;
    predictBtn.classList.remove('loading');
}

// Handle clear button click
clearBtn.addEventListener('click', function () {
    clearAll();

    // Add visual feedback
    clearBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        clearBtn.style.transform = '';
    }, 150);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    initializeDropdown();

    // Add smooth entrance animations
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});
