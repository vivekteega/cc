//Button
const smButton = document.createElement('template')
smButton.innerHTML = `
<style>     
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }       
    :host{
        display: inline-flex;
    }
    :host([disabled]) .button{
        cursor: not-allowed;
        opacity: 1;
        background: rgba(var(--text-color), 0.3) !important;
        color: rgba(var(--foreground-color), 1);
    }
    :host([variant='primary']) .button{
        background: hsl(var(--hue), var(--saturation), var(--lightness));
        color: rgba(var(--foreground-color), 1);
    }
    :host([variant='outlined']) .button{
        box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset;
        background: transparent; 
        color: var(--accent-color);
    }
    :host([variant='no-outline']) .button{
        background: rgba(var(--foreground-color), 1); 
        color: var(--accent-color);
    }
    :host(.small) .button{
        padding: 0.4rem 0.8rem;
    }
    :host(.round) .button{
        border-radius: 10rem;
    }
    .button {
        display: flex;
        width: 100%;
        padding: 0.6rem 1rem;
        cursor: pointer;
        user-select: none;
        border-radius: 0.3rem; 
        justify-content: center;
        transition: box-shadow 0.3s;
        text-transform: capitalize;
        font-size: 0.9em;
        font-weight: 500;
        color: rgba(var(--text-color), 0.9);
        font-family: var(--font-family);
        background: rgba(var(--text-color), 0.1); 
        -webkit-tap-highlight-color: transparent;
        outline: none;
    }
    :host(:not([disabled])) .button:focus{
        box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.2rem 0.8rem rgba(0, 0, 0, 0.2);
    }
    :host([variant='outlined']) .button:focus{
        box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset, 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
    }
    @media (hover: hover){
        :host(:not([disabled])) .button:active{
            box-shadow: none !important;
        }
        :host([variant='outlined']) .button:active{
            box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset !important;
        }
        :host(:not([disabled])) .button:hover{
            box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.2rem 0.8rem rgba(0, 0, 0, 0.12);
        }
        :host([variant='outlined']) .button:hover{
            box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset, 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.4rem 0.8rem rgba(0, 0, 0, 0.12);
        }
        :host([variant="primary"]:not([disabled])) .button:active{
            background: hsl(var(--hue), var(--saturation), calc(var(--lightness) - 20%)) !important;
        }
        :host([variant="primary"]:not([disabled])) .button:hover{
            background: hsl(var(--hue), var(--saturation), calc(var(--lightness) - 10%));
        }
    }
    @media (hover: none){
        :host(:not([disabled])) .button:active{
            box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.2rem 0.8rem rgba(0, 0, 0, 0.2);
        }
        :host([variant='outlined']) .button:active{
            box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset, 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
        }
    }
</style>
<div part="button" class="button" tabindex="0" role="button">
    <slot></slot>   
</div>`;
customElements.define('sm-button',
    class extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({ mode: 'open' }).append(smButton.content.cloneNode(true))
        }

        get disabled() {
            return this.isDisabled
        }

        set disabled(value) {
            if (value && !this.isDisabled) {
                this.isDisabled = true
                this.setAttribute('disabled', '')
                this.button.removeAttribute('tabindex')
            }
            else if (!value && this.isDisabled) {
                this.isDisabled = false
                this.removeAttribute('disabled')
            }
        }

        dispatch() {
            if (this.isDisabled) {
                this.dispatchEvent(new CustomEvent('disabled', {
                    bubbles: true,
                    composed: true
                }))
            }
            else {
                this.dispatchEvent(new CustomEvent('clicked', {
                    bubbles: true,
                    composed: true
                }))
            }
        }

        connectedCallback() {
            this.isDisabled = false
            this.button = this.shadowRoot.querySelector('.button')
            if (this.hasAttribute('disabled') && !this.isDisabled)
                this.isDisabled = true
            this.addEventListener('click', (e) => {
                this.dispatch()
            })
            this.addEventListener('keyup', (e) => {
                if (e.code === "Enter" || e.code === "Space")
                    this.dispatch()
            })
        }
    })

//Input
const smInput = document.createElement('template')
smInput.innerHTML = `
<style>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
} 
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration { display: none; }
input[type=number] {
-moz-appearance:textfield;
}
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0; 
}
input:invalid{
    outline: none;
    box-shadow: none;
}
::-moz-focus-inner{
border: none;
}
:host{
    display: flex;
}
.hide{
   opacity: 0 !important;
   pointer-events: none !important;
}
.hide-completely{
    display: none;
}
.icon {
    fill: none;
    height: 1.6em;
    width: 1.6em;
    padding: 0.5em;
    stroke: rgba(var(--text-color), 0.7);
    stroke-width: 10;
    overflow: visible;
    stroke-linecap: round;
    border-radius: 1em;
    stroke-linejoin: round;
    cursor: pointer;
    min-width: 0;
}
:host(.round) .input{
    border-radius: 10rem;
}
.input {
    display: flex;
    align-items: center;
    text-align: left;
    position: relative;
    gap: 1em;
    padding: 0.7em 1em;
    border-radius: 0.3em;
    transition: opacity 0.3s;
    background: rgba(var(--text-color), 0.06);
    box-shadow: 0 0 0 0.1em rgba(var(--text-color), 0.2) inset;
    font-family: var(--font-family);
    width: 100%
    outline: none;
    min-width: 0;
}
input:focus{
    caret-color: var(--accent-color);
}
.input:focus-within{
    box-shadow: 0 0 0 0.1em var(--accent-color) inset;
}
.disabled{
    pointer-events: none;
}
.label {
    user-select: none;
    opacity: .7;
    font-weight: 400;
    font-size: 1em;
    position: absolute;
    top: 0;
    transition: transform 0.3s;
    -webkit-transform-origin: left;
    transform-origin: left;
    pointer-events: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    will-change: transform;
}
.outer-container{
    position: relative;
    width: 100%;
}
.container{
    width: 100%;
    display: flex;
    position: relative;
    align-items: center;
    flex: 1;
}    
input{
    font-size: 1em;
    border: none;
    background: transparent;
    outline: none;
    color: rgba(var(--text-color), 1);
    width: 100%;
}
.animate-label .container input {
    -webkit-transform: translateY(0.6em);
            transform: translateY(0.6em);
    }
  
.animate-label .container .label {
    -webkit-transform: translateY(-0.6em) scale(0.8);
            transform: translateY(-0.6em) scale(0.8);
    opacity: 1;
    color: var(--accent-color)
}
.helper-text{
    top: 100%;
    width: 100%;
    position: absolute;
    color: var(--error-color);
    background: rgba(var(--foreground-color), 1);
    margin-top: 0.5em;
    border-radius: 0.2em;
    border: solid 1px rgba(var(--text-color), 0.2);
    padding: 0.6em 1em;
}
.helper-text:empty{
    padding: 0;
}
@media (any-hover: hover){
    .icon:hover{
        background: rgba(var(--text-color), 0.1);
    }
}
</style>
<div class="outer-container">
    <label part="input" class="input">
        <slot name="icon"></slot>
        <div class="container">
            <input/>
            <div part="placeholder" class="label"></div>
        </div>
        <svg class="icon clear hide" viewBox="0 0 64 64">
            <title>clear</title>
            <line x1="64" y1="0" x2="0" y2="64"/>
            <line x1="64" y1="64" x2="0" y2="0"/>
        </svg>
    </label>
    <div class="helper-text hide"></div>
</div>
`;
customElements.define('sm-input',
    class extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({ mode: 'open' }).append(smInput.content.cloneNode(true))
        }
        static get observedAttributes() {
            return ['placeholder']
        }

        get value() {
            return this.shadowRoot.querySelector('input').value
        }

        set value(val) {
            this.shadowRoot.querySelector('input').value = val;
            this.checkInput()
            this.fireEvent()
        }

        get placeholder() {
            return this.getAttribute('placeholder')
        }

        set placeholder(val) {
            this.setAttribute('placeholder', val)
        }

        get type() {
            return this.getAttribute('type')
        }

        get isValid() {
            return this.shadowRoot.querySelector('input').checkValidity()
        }

        set disabled(value) {
            if (value)
                this.shadowRoot.querySelector('.input').classList.add('disabled')
            else
                this.shadowRoot.querySelector('.input').classList.remove('disabled')
        }

        focusIn = () => {
            this.shadowRoot.querySelector('input').focus()
        }

        focusOut = () => {
            this.shadowRoot.querySelector('input').blur()
        }

        preventNonNumericalInput = (e) => {
            let keyCode = e.keyCode;
            if (!((keyCode > 47 && keyCode < 56) || (keyCode > 36 && keyCode < 39) || (keyCode > 95 && keyCode < 106) || keyCode === 110 || (keyCode > 7 && keyCode < 19))) {
                e.preventDefault();
            }
        }

        fireEvent = () => {
            let event = new Event('input', {
                bubbles: true,
                cancelable: true,
                composed: true
            });
            this.dispatchEvent(event);
        }

        checkInput = (e) => {
            if (!this.hasAttribute('placeholder') || this.getAttribute('placeholder') === '')
                return;
            if (this.input.value !== '') {
                if (this.animate)
                    this.inputParent.classList.add('animate-label')
                else
                    this.label.classList.add('hide')
                if (!this.readonly)
                    this.clearBtn.classList.remove('hide')
            }
            else {
                if (this.animate)
                    this.inputParent.classList.remove('animate-label')
                else
                    this.label.classList.remove('hide')
                if (!this.readonly)
                    this.clearBtn.classList.add('hide')
            }
        }


        connectedCallback() {
            this.inputParent = this.shadowRoot.querySelector('.input')
            this.clearBtn = this.shadowRoot.querySelector('.clear')
            this.label = this.shadowRoot.querySelector('.label')
            this.helperText = this.shadowRoot.querySelector('.helper-text')
            this.valueChanged = false;
            this.readonly = false
            this.min
            this.max
            this.animate = this.hasAttribute('animate')
            this.input = this.shadowRoot.querySelector('input')
            this.shadowRoot.querySelector('.label').textContent = this.getAttribute('placeholder')
            if (this.hasAttribute('value')) {
                this.input.value = this.getAttribute('value')
                this.checkInput()
            }
            if (this.hasAttribute('required')) {
                this.input.setAttribute('required', '')
            }
            if (this.hasAttribute('min')) {
                let minValue = this.getAttribute('min')
                this.input.setAttribute('min', minValue)
                this.min = parseInt(minValue)
            }
            if (this.hasAttribute('max')) {
                let maxValue = this.getAttribute('max')
                this.input.setAttribute('max', maxValue)
                this.max = parseInt(maxValue)
            }
            if (this.hasAttribute('pattern')) {
                this.input.setAttribute('pattern', this.getAttribute('pattern'))
            }
            if (this.hasAttribute('readonly')) {
                this.input.setAttribute('readonly', '')
                this.readonly = true        
            }
            if (this.hasAttribute('readonly')) {
                this.inputParent.classList.add('disabled')
            }
            if (this.hasAttribute('helper-text')) {
                this.helperText.textContent = this.getAttribute('helper-text')
            }
            if (this.hasAttribute('type')) {
                if (this.getAttribute('type') === 'number') {
                    this.input.setAttribute('inputmode', 'numeric')
                    this.input.setAttribute('type', 'number')
                }
                else
                    this.input.setAttribute('type', this.getAttribute('type'))
            }
            else
                this.input.setAttribute('type', 'text')
            this.input.addEventListener('keydown', e => {
                if (this.getAttribute('type') === 'number')
                    this.preventNonNumericalInput(e);
            })
            this.input.addEventListener('input', e => {
                this.checkInput()
            })
            this.clearBtn.addEventListener('click', e => {
                this.value = ''
            })
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                if (name === 'placeholder')
                    this.shadowRoot.querySelector('.label').textContent = newValue;
                    this.setAttribute('aria-label', newValue);
            }
        }
    })

//textarea
const smTextarea = document.createElement('template')
smTextarea.innerHTML = `
<style>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
} 
::-moz-focus-inner{
    border: none;
}
:host{
    display: flex;
}
.hide{
   opacity: 0 !important;
   pointer-events: none !important;
}
.hide-completely{
    display: none;
}
.icon {
    fill: none;
    height: 1.6em;
    width: 1.6em;
    padding: 0.5em;
    stroke: rgba(var(--text-color), 0.7);
    stroke-width: 10;
    overflow: visible;
    stroke-linecap: round;
    border-radius: 1em;
    stroke-linejoin: round;
    cursor: pointer;
    min-width: 0;
}
.input {
    flex: 1;
    display: flex;
    align-items: center;
    position: relative;
    padding: 0.7em 1em;
    border-radius: 0.3em;
    transition: opacity 0.3s;
    background: rgba(var(--text-color), 0.1);
    font-family: var(--font-family);
    width: 100%
    outline: none;
    min-width: 0;
}

textarea:focus{
    caret-color: var(--accent-color);
}
.input:focus-within{
    box-shadow: 0 0 0 0.1em var(--accent-color) inset;
}

.label {
    user-select: none;
    opacity: .7;
    font-weight: 400;
    font-size: 1em;
    position: absolute;
    top: 0.9em;
    transition: transform 0.3s;
    -webkit-transform-origin: left;
    transform-origin: left;
    pointer-events: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    will-change: transform;
}   
textarea{
    font-size: 1em;
    border: none;
    background: transparent;
    outline: none;
    color: rgba(var(--text-color), 1);
    width: 100%;
    font-family: inherit;
    line-height: 1.6;
}
.animate-label textarea {
    -webkit-transform: translateY(0.6em);
            transform: translateY(0.6em);
}
  
.animate-label .label {
    -webkit-transform: translateY(-0.6em) scale(0.8);
            transform: translateY(-0.6em) scale(0.8);
    opacity: 1;
    color: var(--accent-color)
}
.clear{
    align-self: flex-start;
}
@media (any-hover: hover){
    .icon:hover{
        background: rgba(var(--text-color), 0.1);
    }
}
</style>
<label class="input">
<textarea rows="1"></textarea>
<div part="placeholder" class="label"></div>
<svg class="icon clear hide" viewBox="0 0 64 64">
    <title>clear</title>
    <line x1="64" y1="0" x2="0" y2="64"/>
    <line x1="64" y1="64" x2="0" y2="0"/>
</svg>
</label>
`;
customElements.define('sm-textarea',
    class extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({ mode: 'open' }).append(smTextarea.content.cloneNode(true))
        }
        static get observedAttributes() {
            return ['placeholder']
        }

        get value() {
            return this.shadowRoot.querySelector('textarea').value
        }

        set value(val) {
            this.shadowRoot.querySelector('textarea').value = val;
            this.checkInput()
            this.fireEvent()
        }

        get placeholder() {
            return this.getAttribute('placeholder')
        }

        set placeholder(val) {
            this.setAttribute('placeholder', val)
        }

        fireEvent() {
            let event = new Event('input', {
                bubbles: true,
                cancelable: true,
                composed: true
            });
            this.dispatchEvent(event);
        }

        checkInput() {
            if (!this.hasAttribute('placeholder') || this.getAttribute('placeholder') === '')
                return;
            if (this.input.value !== '') {
                if (this.animate)
                    this.inputParent.classList.add('animate-label')
                else
                    this.label.classList.add('hide')
                if (!this.readonly)
                    this.clearBtn.classList.remove('hide')
            }
            else {
                if (this.animate)
                    this.inputParent.classList.remove('animate-label')
                else
                    this.label.classList.remove('hide')
                if (!this.readonly)
                    this.clearBtn.classList.add('hide')
            }

            this.input.style.height = 'auto'
            this.input.style.height = (this.input.scrollHeight) + 'px';
        }


        connectedCallback() {
            this.inputParent = this.shadowRoot.querySelector('.input')
            this.clearBtn = this.shadowRoot.querySelector('.clear')
            this.label = this.shadowRoot.querySelector('.label')
            this.helperText = this.shadowRoot.querySelector('.helper-text')
            this.valueChanged = false;
            this.readonly = false
            this.animate = this.hasAttribute('animate')
            this.input = this.shadowRoot.querySelector('textarea')
            this.shadowRoot.querySelector('.label').textContent = this.getAttribute('placeholder')

            this.input.setAttribute('style', 'height:' + (this.input.scrollHeight) + 'px;overflow-y:hidden;');

            if (this.hasAttribute('value')) {
                this.input.value = this.getAttribute('value')
                this.checkInput()
            }
            if (this.hasAttribute('required')) {
                this.input.setAttribute('required', '')
            }
            if (this.hasAttribute('readonly')) {
                this.input.setAttribute('readonly', '')
                this.readonly = true
            }
            if (this.hasAttribute('helper-text')) {
                this.helperText.textContent = this.getAttribute('helper-text')
            }
            this.input.addEventListener('keydown', e => {
                if (this.getAttribute('type') === 'number')
                    this.preventNonNumericalInput(e);
            })
            this.input.addEventListener('input', e => {
                this.checkInput()
            })
            this.clearBtn.addEventListener('click', e => {
                this.value = ''
            })
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                if (name === 'placeholder')
                    this.shadowRoot.querySelector('.label').textContent = newValue;
            }
        }
    })

// tab
const smTab = document.createElement('template')
smTab.innerHTML = `
<style>
*{
padding: 0;
margin: 0;
box-sizing: border-box;
} 
:host{
position: relative;
display: inline-flex;
z-index: 1;
}
.tab{
position: relative;
user-select: none;
justify-content: center;
cursor: pointer;
-webkit-tap-highlight-color: transparent;
white-space: nowrap;
padding: 0.4rem 0.8rem;
font-weight: 500;
word-spacing: 0.1em;
text-align: center;
transition: color 0.3s;
text-transform: capitalize;
font-family: var(--font-family);
height: 100%;
}
@media (hover: hover){
:host(.active) .tab{
opacity: 1;
}
.tab{
opacity: 0.7
}
.tab:hover{
opacity: 1
}
}
</style>
<div part="tab" class="tab">
<slot></slot>
</div>
`;

customElements.define('sm-tab', class extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' }).append(smTab.content.cloneNode(true))
    }
})

//chcekbox

const smCheckbox = document.createElement('template')
smCheckbox.innerHTML = `
<style>
*{
padding: 0;
margin: 0;
box-sizing: border-box;
} 
:host{
display: inline-flex;
}
.checkbox {
position: relative;
display:flex;
align-items: center;
cursor: pointer;
height: 1.5rem;
outline: none;
-webkit-tap-highlight-color: transparent;
}

p{
margin-left: 2rem;
}

.checkbox:active .icon,
.checkbox:focus .icon{
background: rgba(var(--text-color), 0.2);
}

.checkbox input {
display: none;
}

.checkbox .checkmark {
stroke-dashoffset: -65;
stroke-dasharray: 65;
-webkit-transition: stroke-dashoffset 0.3s; 
transition: stroke-dashoffset 0.3s;
}

.checkbox input:checked ~ svg .checkmark {
stroke-dashoffset: 0;
stroke: rgba(var(--foreground-color), 1);
}
.checkbox input:checked ~ svg {
stroke: var(--accent-color);
fill: var(--accent-color);
stroke-width: 8; 
}

.icon {
position: absolute;
fill: none;
height: 2.6rem;
width: 2.6rem;
padding: 0.7rem;
stroke: rgba(var(--text-color), 0.7);
stroke-width: 6;
overflow: visible;
stroke-linecap: round;
stroke-linejoin: round;
border-radius: 2rem;
transition: background 0.3s;
left: -0.5rem;
}
.disabled {
opacity: 0.6;
pointer-events: none;
}

</style>
<label class="checkbox" tabindex="0">
<input type="checkbox">
<svg class="icon" viewBox="0 0 64 64">
<title>checkbox</title>
<rect class="box" x="0" y="0" width="64" height="64" rx="4" />
<path class="checkmark" d="M50.52,19.56,26,44.08,13.48,31.56" />
</svg>
<p><slot></slot></p>
</label>`
customElements.define('sm-checkbox', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).append(smCheckbox.content.cloneNode(true))

        this.checkbox = this.shadowRoot.querySelector('.checkbox');
        this.input = this.shadowRoot.querySelector('input')

        this.isChecked = false
        this.isDisabled = false
    }

    static get observedAttributes() {
        return ['disabled', 'checked']
    }

    get disabled() {
        return this.getAttribute('disabled')
    }

    set disabled(val) {
        this.setAttribute('disabled', val)
    }

    get checked() {
        return this.getAttribute('checked')
    }

    set checked(value) {
        this.setAttribute('checked', value)
    }

    dispatch() {
        this.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            composed: true
        }))
    }

    connectedCallback() {
        this.addEventListener('keyup', e => {
            if ((e.code === "Enter" || e.code === "Space") && this.isDisabled == false) {
                this.isChecked = !this.isChecked
                this.setAttribute('checked', this.isChecked)
            }
        })
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'disabled') {
                if (newValue === 'true') {
                    this.checkbox.classList.add('disabled')
                    this.isDisabled = true
                }
                else {
                    this.checkbox.classList.remove('disabled')
                    this.isDisabled = false
                }
            }
            if (name === 'checked') {
                if (newValue == 'true') {
                    this.isChecked = true
                    this.input.checked = true
                    this.dispatch()
                }
                else {
                    this.isChecked = false
                    this.input.checked = false
                    this.dispatch()
                }
            }
        }
    }

})

//switch

const smSwitch = document.createElement('template')
smSwitch.innerHTML = `	
<style>
*{
box-sizing: border-box;
padding: 0;
margin: 0;
}

:host{
display: inline-flex;
}
.switch {
position: relative;
display: flex;
align-items: center;
width: 2.4rem;
padding: 0.2rem;
cursor: pointer;
outline: none;
border-radius: 2rem;
-webkit-tap-highlight-color: transparent;
}

input {
display: none;
}

.track {
position: absolute;
left: 0;
right: 0;
height: 1.4rem;
-webkit-transition: background 0.3s;
transition: background 0.3s;
background: rgba(var(--text-color), 0.4);
box-shadow: 0 0.1rem 0.3rem #00000040 inset;
border-radius: 1rem;
}

.switch:active .button::after,
.switch:focus .button::after{
opacity: 1
}
.switch:focus:not(:focus-visible){
opacity: 0;
}
.switch:focus-visible .button::after{
opacity: 1
}

.button::after{
content: '';
display: flex;
position: absolute;
height: 2.6rem;
width: 2.6rem;
background: rgba(var(--text-color), 0.2);
border-radius: 2rem;
opacity: 0;
transition: opacity 0.3s;
}

.button {
position: relative;
display: inline-flex;
height: 1rem;
width: 1rem;
justify-content: center;
align-items: center;
border-radius: 1rem;
box-shadow: 0 0.1rem 0.4rem #00000060;
transition: transform 0.3s;
border: solid 0.3rem rgba(var(--foreground-color), 1);
}

input:checked ~ .button {
transform: translateX(100%);
}

input:checked ~ .track {
background: var(--accent-color);
}
.disabled {
opacity: 0.6;
pointer-events: none;
}
</style>
<label class="switch" tabindex="0">
<input type="checkbox">
<div class="track"></div>
<div class="button"></div>
</label>`

customElements.define('sm-switch', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).append(smSwitch.content.cloneNode(true))
        this.switch = this.shadowRoot.querySelector('.switch');
        this.input = this.shadowRoot.querySelector('input')
        this.isChecked = false
        this.isDisabled = false
    }

    get disabled() {
        return this.getAttribute('disabled')
    }

    set disabled(val) {
        if (val) {
            this.disabled = true
            this.setAttribute('disabled', '')
            this.switch.classList.add('disabled')
        }
        else {
            this.disabled = false
            this.removeAttribute('disabled')
            this.switch.classList.remove('disabled')

        }
    }

    get checked() {
        return this.isChecked
    }

    set checked(value) {
        if (value) {
            this.setAttribute('checked', '')
            this.isChecked = true
            this.input.checked = true
        }
        else {
            this.removeAttribute('checked')
            this.isChecked = false
            this.input.checked = false
        }
    }

    dispatch = () => {
        this.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            composed: true
        }))
    }

    connectedCallback() {
        if (this.hasAttribute('disabled'))
            this.switch.classList.add('disabled')
        this.addEventListener('keyup', e => {
            if ((e.code === "Enter" || e.code === "Space") && !this.isDisabled) {
                this.input.click()
            }
        })
        this.input.addEventListener('click', e => {
            if (this.input.checked)
                this.checked = true
            else
                this.checked = false
            this.dispatch()
        })
    }
})

// select
const smSelect = document.createElement('template')
smSelect.innerHTML = `
<style>     
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    } 
    .icon {
        fill: none;
        height: 0.8rem;
        width: 0.8rem;
        stroke: rgba(var(--text-color), 0.7);
        stroke-width: 6;
        overflow: visible;
        stroke-linecap: round;
        stroke-linejoin: round;
    }      
    :host{
        display: inline-flex;
    }
    .hide{
        opacity: 0;
        pointer-events: none;
    }
    .select{
        position: relative;
        display: flex;
        flex-direction: column;
        cursor: pointer;
        width: 100%;
        -webkit-tap-highlight-color: transparent;
    }
    .option-text{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .selection{
        border-radius: 0.3rem;
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-areas: 'heading heading' '. .';
        padding: 0.4rem 1rem;
        background: rgba(var(--text-color), 0.06);
        border: solid 1px rgba(var(--text-color), 0.2);
        align-items: center;
        outline: none;
    }
    .selection:focus{
        box-shadow: 0 0 0 0.1rem var(--accent-color) 
    }
    .icon{
        margin-left: 1rem;
    }
    :host([align-select="left"]) .options{
        left: 0;
    }
    :host([align-select="right"]) .options{
        right: 0;
    }
    .options{
        top: 100%;
        margin-top: 0.5rem; 
        overflow: hidden auto;
        position: absolute;
        grid-area: options;
        display: flex;
        flex-direction: column;
        min-width: 100%;
        background: rgba(var(--foreground-color), 1);
        transition: opacity 0.3s, top 0.3s;
        border: solid 1px rgba(var(--text-color), 0.2);
        border-radius: 0.3rem;
        z-index: 2;
        box-shadow: 0.4rem 0.8rem 1.2rem #00000030;
        max-height:70vh;
    }
    .rotate{
        transform: rotate(180deg)
    }
</style>
<div class="select" >
    <div class="selection" tabindex="0">
        <div class="option-text"></div>
        <svg class="icon toggle" viewBox="0 0 64 64">
            <polyline points="63.65 15.99 32 47.66 0.35 15.99"/>
        </svg>
    </div>
    <div class="options hide">
        <slot></slot> 
    </div>
</div>`;
customElements.define('sm-select', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).append(smSelect.content.cloneNode(true))
    }
    static get observedAttributes() {
        return ['value']
    }
    get value() {
        return this.getAttribute('value')
    }
    set value(val) {
        this.setAttribute('value', val)
    }

    collapse() {
        this.optionList.animate(this.slideUp, this.animationOptions)
        this.optionList.classList.add('hide')
        this.chevron.classList.remove('rotate')
        this.open = false
    }
    connectedCallback() {
        this.availableOptions
        this.optionList = this.shadowRoot.querySelector('.options')
        this.chevron = this.shadowRoot.querySelector('.toggle')
        let slot = this.shadowRoot.querySelector('.options slot'),
            selection = this.shadowRoot.querySelector('.selection'),
            previousOption
        this.open = false;
        this.slideDown = [
            { transform: `translateY(-0.5rem)` },
            { transform: `translateY(0)` }
        ],
            this.slideUp = [
                { transform: `translateY(0)` },
                { transform: `translateY(-0.5rem)` }
            ],
            this.animationOptions = {
                duration: 300,
                fill: "forwards",
                easing: 'ease'
            }
        selection.addEventListener('click', e => {
            if (!this.open) {
                this.optionList.classList.remove('hide')
                this.optionList.animate(this.slideDown, this.animationOptions)
                this.chevron.classList.add('rotate')
                this.open = true
            } else {
                this.collapse()
            }
        })
        selection.addEventListener('keydown', e => {
            if (e.code === 'ArrowDown' || e.code === 'ArrowRight') {
                e.preventDefault()
                this.availableOptions[0].focus()
            }
            if (e.code === 'Enter' || e.code === 'Space')
                if (!this.open) {
                    this.optionList.classList.remove('hide')
                    this.optionList.animate(this.slideDown, this.animationOptions)
                    this.chevron.classList.add('rotate')
                    this.open = true
                } else {
                    this.collapse()
                }
        })
        this.optionList.addEventListener('keydown', e => {
            if (e.code === 'ArrowUp' || e.code === 'ArrowRight') {
                e.preventDefault()
                if (document.activeElement.previousElementSibling) {
                    document.activeElement.previousElementSibling.focus()
                }
            }
            if (e.code === 'ArrowDown' || e.code === 'ArrowLeft') {
                e.preventDefault()
                if (document.activeElement.nextElementSibling)
                    document.activeElement.nextElementSibling.focus()
            }
        })
        this.addEventListener('optionSelected', e => {
            if (previousOption !== e.target) {
                this.setAttribute('value', e.detail.value)
                this.shadowRoot.querySelector('.option-text').textContent = e.detail.text;
                this.dispatchEvent(new CustomEvent('change', {
                    bubbles: true,
                    composed: true
                }))
                if (previousOption) {
                    previousOption.classList.remove('check-selected')
                }
                previousOption = e.target;
            }
            if (!e.detail.switching)
                this.collapse()

            e.target.classList.add('check-selected')
        })
        slot.addEventListener('slotchange', e => {
            this.availableOptions = slot.assignedElements()
            if (this.availableOptions[0]) {
                let firstElement = this.availableOptions[0];
                previousOption = firstElement;
                firstElement.classList.add('check-selected')
                this.setAttribute('value', firstElement.getAttribute('value'))
                this.shadowRoot.querySelector('.option-text').textContent = firstElement.textContent
                this.availableOptions.forEach((element, index) => {
                    element.setAttribute('data-rank', index + 1);
                    element.setAttribute('tabindex', "0");
                })
            }
        });
        document.addEventListener('mousedown', e => {
            if (!this.contains(e.target) && this.open) {
                this.collapse()
            }
        })
    }
})

// option
const smOption = document.createElement('template')
smOption.innerHTML = `
<style>     
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }     
    :host{
        display: flex;
    }
    .option{
        min-width: 100%;
        padding: 0.8rem 1.2rem;
        cursor: pointer;
        overflow-wrap: break-word;
        outline: none;
        display: flex;
        align-items: center;
    }
    :host(:focus){
        outline: none;
        background: rgba(var(--text-color), 0.1);
    }
    :host(:focus) .option .icon{
        opacity: 0.4
    }
    :host(.check-selected) .icon{
        opacity: 1 !important
    }
    .icon {
        margin-right: 0.8rem;
        fill: none;
        height: 0.8rem;
        width: 0.8rem;
        stroke: rgba(var(--text-color), 0.7);
        stroke-width: 10;
        overflow: visible;
        stroke-linecap: round;
        border-radius: 1rem;
        stroke-linejoin: round;
        opacity: 0;
    }
    @media (hover: hover){
        .option:hover{
            background: rgba(var(--text-color), 0.1);
        }
        .option:hover .icon{
            opacity: 0.4
        }
    }
</style>
<div class="option">
    <svg class="icon" viewBox="0 0 64 64">
        <polyline points="0.35 31.82 21.45 52.98 63.65 10.66"/>
    </svg>
    <slot></slot> 
</div>`;
customElements.define('sm-option', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).append(smOption.content.cloneNode(true))
    }

    sendDetails(switching) {
        let optionSelected = new CustomEvent('optionSelected', {
            bubbles: true,
            composed: true,
            detail: {
                text: this.textContent,
                value: this.getAttribute('value'),
                switching: switching
            }
        })
        this.dispatchEvent(optionSelected)
    }

    connectedCallback() {
        let validKey = [
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight'
        ]
        this.addEventListener('click', e => {
            this.sendDetails()
        })
        this.addEventListener('keyup', e => {
            if (e.code === 'Enter' || e.code === 'Space') {
                e.preventDefault()
                this.sendDetails(false)
            }
            if (validKey.includes(e.code)) {
                e.preventDefault()
                this.sendDetails(true)
            }
        })
        if (this.hasAttribute('default')) {
            setTimeout(() => {
                this.sendDetails()
            }, 0);
        }
    }
})

// select
const smStripSelect = document.createElement('template')
smStripSelect.innerHTML = `
<style>     
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }    
    :host{
        display: flex;
    }
    .icon {
        position: absolute;
        display: flex;
        fill: none;
        height: 2.6rem;
        width: 2.6rem;
        padding: 0.9rem;
        stroke: rgba(var(--text-color), 0.7);
        stroke-width: 10;
        overflow: visible;
        stroke-linecap: round;
        stroke-linejoin: round;
        cursor: pointer;
        min-width: 0;
        z-index: 1;
        background: rgba(var(--foreground-color), 1);
        -webkit-tap-highlight-color: transparent;
        transition: opacity 0.3s; 
    }
    .hide{
        pointer-events: none;
        opacity: 0;
    }
    .select-container{
        position: relative;
        display: flex;
        width: 100%;
        align-items: center;
    }
    .select{
        position: relative;
        display: flex;
        gap: 0.5rem;
        max-width: 100%;
        overflow: auto hidden;
    }
    .previous-item{
        left: 0;
    }
    .next-item{
        right: 0;
    }
    .left,.right{
        position: absolute;
        width: 1rem;
        height: 100%; 
        transition: opacity 0.3s;
        z-index: 1;
    }
    .left{
        background: linear-gradient(to left, transparent, rgba(var(--foreground-color), 1))
    }
    .right{
        right: 0;
        background: linear-gradient(to right, transparent, rgba(var(--foreground-color), 1))
    }
    slot::slotted(.active){
        border-radius: 2rem;
        opacity: 1;
        background-color: rgba(var(--text-color), .6);  
        color: rgba(var(--foreground-color), 1);
    }
    @media (hover: none){
        ::-webkit-scrollbar-track {
            -webkit-box-shadow: none !important;
            background-color: transparent !important;
        }
        ::-webkit-scrollbar {
            height: 0;
            background-color: transparent;
        }
        .icon{
            display: none;
        }
        .left,.right{
            display: block;
        }
    }
    @media (hover: hover){
        .select{
            overflow: hidden;
        }
        .left,.right{
            display: none;
        }
    }
</style>
<div class="select-container">
    <div class="left hide"></div>
    <svg class="icon previous-item hide" viewBox="4 0 64 64">
        <title>Previous</title>
        <polyline points="48.01 0.35 16.35 32 48.01 63.65"/>
    </svg>
    <div class="select">
        <slot></slot> 
    </div>
    <svg class="icon next-item hide" viewBox="-6 0 64 64">
        <title>Next</title>
        <polyline points="15.99 0.35 47.65 32 15.99 63.65"/>
    </svg>
    <div class="right hide"></div>
</div>`;
customElements.define('sm-strip-select', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).append(smStripSelect.content.cloneNode(true))
    }
    static get observedAttributes() {
        return ['value']
    }
    get value() {
        return this.getAttribute('value')
    }
    set value(val) {
        this.setAttribute('value', val)
    }
    scrollLeft = () => {
        this.select.scrollBy({
            top: 0,
            left: -this.scrollDistance,
            behavior: 'smooth'
        })
    }

    scrollRight = () => {
        this.select.scrollBy({
            top: 0,
            left: this.scrollDistance,
            behavior: 'smooth'
        })
    }
    connectedCallback() {
        let previousOption,
            slot = this.shadowRoot.querySelector('slot');
        this.selectContainer = this.shadowRoot.querySelector('.select-container')
        this.select = this.shadowRoot.querySelector('.select')
        this.nextArrow = this.shadowRoot.querySelector('.next-item')
        this.previousArrow = this.shadowRoot.querySelector('.previous-item')
        this.nextGradient = this.shadowRoot.querySelector('.right')
        this.previousGradient = this.shadowRoot.querySelector('.left')
        this.selectOptions
        this.scrollDistance = this.selectContainer.getBoundingClientRect().width
        const firstElementObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                this.previousArrow.classList.add('hide')
                this.previousGradient.classList.add('hide')
            }
            else {
                this.previousArrow.classList.remove('hide')
                this.previousGradient.classList.remove('hide')
            }
        }, {
            root: this.selectContainer,
            threshold: 0.95
        })
        const lastElementObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                this.nextArrow.classList.add('hide')
                this.nextGradient.classList.add('hide')
            }
            else {
                this.nextArrow.classList.remove('hide')
                this.nextGradient.classList.remove('hide')
            }
        }, {
            root: this.selectContainer,
            threshold: 0.95
        })

        const selectObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                this.scrollDistance = this.selectContainer.getBoundingClientRect().width
            }
        })

        selectObserver.observe(this.selectContainer)
        this.addEventListener('optionSelected', e => {
            if (previousOption === e.target) return;
            if (previousOption)
                previousOption.classList.remove('active')
            e.target.classList.add('active')
            e.target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
            this.setAttribute('value', e.detail.value)
            this.dispatchEvent(new CustomEvent('change', {
                bubbles: true,
                composed: true
            }))
            previousOption = e.target;
        })
        slot.addEventListener('slotchange', e => {
            this.selectOptions = slot.assignedElements()
            firstElementObserver.observe(this.selectOptions[0])
            lastElementObserver.observe(this.selectOptions[this.selectOptions.length - 1])
            if (this.selectOptions[0]) {
                let firstElement = this.selectOptions[0];
                this.setAttribute('value', firstElement.getAttribute('value'))
                firstElement.classList.add('active')
                previousOption = firstElement;
            }
        });
        this.nextArrow.addEventListener('click', this.scrollRight)
        this.previousArrow.addEventListener('click', this.scrollLeft)
    }

    disconnectedCallback() {
        this.nextArrow.removeEventListener('click', this.scrollRight)
        this.previousArrow.removeEventListener('click', this.scrollLeft)
    }
})

// option
const smStripOption = document.createElement('template')
smStripOption.innerHTML = `
<style>     
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }     
    :host{
        display: flex;
    }
    .option{
        padding: 0.4rem 0.8rem;
        cursor: pointer;
        overflow-wrap: break-word;
        outline: none;
        border-radius: 2rem;
        text-transform: capitalize;
        border: solid 1px rgba(var(--text-color), .3);
        opacity: 0.9;
    }
    .option:focus{
        background: rgba(var(--text-color), 0.1);
    }

    @media (hover: hover){
        .option{
            transition: background 0.3s;
        }
        .option:hover{
            background: rgba(var(--text-color), 0.1);
        }
    }
</style>
<div class="option" tabindex="0">
    <slot></slot> 
</div>`;
customElements.define('sm-strip-option', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).append(smStripOption.content.cloneNode(true))
    }
    sendDetails() {
        let optionSelected = new CustomEvent('optionSelected', {
            bubbles: true,
            composed: true,
            detail: {
                text: this.textContent,
                value: this.getAttribute('value')
            }
        })
        this.dispatchEvent(optionSelected)
    }

    connectedCallback() {
        this.addEventListener('click', e => {
            this.sendDetails()
        })
        this.addEventListener('keyup', e => {
            if (e.code === 'Enter' || e.code === 'Space') {
                e.preventDefault()
                this.sendDetails(false)
            }
        })
        if (this.hasAttribute('default')) {
            setTimeout(() => {
                this.sendDetails()
            }, 0);
        }
    }
})

//popup
const smPopup = document.createElement('template')
smPopup.innerHTML = `
<style>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
} 
:host{
    position: fixed;
    display: grid;
}
.popup-container{
    display: grid;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    place-items: center;
    background: rgba(0, 0, 0, 0.6);
    transition: opacity 0.3s ease;
    z-index: 10;
}
:host(.stacked) .popup{
    transform: scale(0.9) translateY(-2rem) !important;
}
.popup{
    display: flex;
    flex-direction: column;
    position: relative;
    align-self: flex-end;
    align-items: flex-start;
    width: 100%;
    border-radius: 0.8rem 0.8rem 0 0;
    transform: translateY(100%);
    transition: transform 0.3s;
    background: rgba(var(--foreground-color), 1);
    box-shadow: 0 -1rem 2rem #00000020;
    max-height: 100vh;
}
.container-header{
    display: flex;
    width: 100%;
    align-items: center;
}
.popup-top{
    display: flex;
    width: 100%;
}
.popup-body{
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    padding: 1.5rem;
    overflow-y: auto;
}
.heading{
    font-weight: 400;
}
.heading:first-letter{
    text-transform: uppercase;
}
.hide{
    opacity: 0;
    pointer-events: none;
}
@media screen and (min-width: 640px){
    .popup{
        width: max-content;
        align-self: center;
        border-radius: 0.4rem;
        height: auto;
        transform: translateY(1rem);
        box-shadow: 0 3rem 2rem -0.5rem #00000040;
    }
}
@media screen and (max-width: 640px){
.popup-top{
    flex-direction: column;
    align-items: center;
}
.handle{
    height: 0.3rem;
    width: 2rem;
    background: rgba(var(--text-color), .2);
    border-radius: 1rem;
    margin: 0.5rem 0;
}
.heading{
    padding: 1rem 1.5rem
}
.close{
    height: 2rem;
    width: 2rem;
    padding: 0.55rem;
    margin-right: 1rem;
}
}
</style>
<div part="background" class="popup-container hide" role="dialog">
<div part="popup" class="popup">
<div class="popup-top">
    <div class="handle"></div>
    <slot name="header"></slot>
</div>
<div class="popup-body">
    <slot></slot>
</div>
</div>
</div>
`;
customElements.define('sm-popup', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).append(smPopup.content.cloneNode(true))

        this.allowClosing = false
    }

    resumeScrolling = () => {
        const scrollY = document.body.style.top;
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        setTimeout(() => {
            document.body.setAttribute('style', `overflow: auto; top: initial`)
        }, 300);
    }

    show = (pinned, popupStack) => {
        if(popupStack)
            this.popupStack = popupStack
        if (this.popupStack && !this.hasAttribute('open')) {
            this.popupStack.push({
                popup: this,
                permission: pinned
            })
            if (this.popupStack.items.length > 1){
                this.popupStack.items[this.popupStack.items.length - 2].popup.classList.add('stacked')
            }
        }
        this.setAttribute('open', '')
        this.pinned = pinned
        this.popupContainer.classList.remove('hide')
        this.popup.style.transform = 'translateY(0)';
        document.body.setAttribute('style', `overflow: hidden; top: -${window.scrollY}px`)
        this.dispatchEvent(
            new CustomEvent("popupopened", {
                bubbles: true,
                detail: {
                    popup: this,
                    popupStack: this.popupStack
                }
            })
        ) 
        return this.popupStack
    }
    hide = () => {
        this.removeAttribute('open')
        if(window.innerWidth < 640)
            this.popup.style.transform = 'translateY(100%)';
        else
            this.popup.style.transform = 'translateY(1rem)';
        this.popupContainer.classList.add('hide')
        if (typeof this.popupStack !== 'undefined') {
            this.popupStack.pop()
            if (this.popupStack.items.length){
                this.popupStack.items[this.popupStack.items.length - 1].popup.classList.remove('stacked')
            }
            else {
                this.resumeScrolling()
            }
        }
        else {
            this.resumeScrolling()
        }

        if (this.inputFields.length) {
            setTimeout(() => {
                this.inputFields.forEach(field => {
                    if (field.type === 'radio' || field.tagName === 'SM-CHECKBOX')
                        field.checked = false
                    if (field.tagName === 'SM-INPUT' || field.tagName === 'TEXTAREA')
                        field.value = ''
                })
            }, 300);
        }
        this.dispatchEvent(
            new CustomEvent("popupclosed", {
                bubbles: true,
                detail: {
                    popup: this,
                    popupStack: this.popupStack
                }
            })
        )
    }

    handleTouchStart = (e) => {
        this.touchStartY = e.changedTouches[0].clientY
        this.popup.style.transition = 'initial'
        this.touchStartTime = e.timeStamp
    }

    handleTouchMove = (e) => {
        e.preventDefault()
        if (this.touchStartY < e.changedTouches[0].clientY) {
            this.offset = e.changedTouches[0].clientY - this.touchStartY;
            this.touchEndAnimataion = window.requestAnimationFrame(() => this.movePopup())
        }
        /*else {
            this.offset = this.touchStartY - e.changedTouches[0].clientY;
            this.popup.style.transform = `translateY(-${this.offset}px)`
        }*/
    }
    
    handleTouchEnd = (e) => {
        this.touchEndTime = e.timeStamp
        cancelAnimationFrame(this.touchEndAnimataion)
        this.touchEndY = e.changedTouches[0].clientY
        this.popup.style.transition = 'transform 0.3s'
        if (this.touchEndTime - this.touchStartTime > 200) {
            if (this.touchEndY - this.touchStartY > this.threshold) {
                this.hide()
            }
            else {
                this.show()
            }
        }
        else {
            if (this.touchEndY > this.touchStartY)
                this.hide()
        }
    }

    movePopup = () => {
        this.popup.style.transform = `translateY(${this.offset}px)`
    }

    connectedCallback() {
        this.pinned = false
        this.popupStack
        this.popupContainer = this.shadowRoot.querySelector('.popup-container')
        this.popup = this.shadowRoot.querySelector('.popup')
        this.popupBodySlot = this.shadowRoot.querySelector('.popup-body slot')
        this.offset
        this.popupHeader = this.shadowRoot.querySelector('.popup-top')
        this.touchStartY = 0
        this.touchEndY = 0
        this.touchStartTime = 0
        this.touchEndTime = 0
        this.threshold = this.popup.getBoundingClientRect().height * 0.3
        this.touchEndAnimataion;

        if (this.hasAttribute('open'))
            this.show()
        this.popupContainer.addEventListener('mousedown', e => {
            if (e.target === this.popupContainer && !this.pinned) {
                this.hide()
            }
        })

        this.popupBodySlot.addEventListener('slotchange', () => {
            this.inputFields = this.querySelectorAll('sm-input', 'sm-checkbox', 'textarea', 'radio')
        })

        this.popupHeader.addEventListener('touchstart', (e) => {
            this.handleTouchStart(e)
        })
        this.popupHeader.addEventListener('touchmove', (e) => {
            this.handleTouchMove(e)
        })
        this.popupHeader.addEventListener('touchend', (e) => {
            this.handleTouchEnd(e)
        })
    }
    disconnectedCallback() {
        this.popupHeader.removeEventListener('touchstart', this.handleTouchStart)
        this.popupHeader.removeEventListener('touchmove', this.handleTouchMove)
        this.popupHeader.removeEventListener('touchend', this.handleTouchEnd)
    }
})

//carousel

const smCarousel = document.createElement('template')
smCarousel.innerHTML = `
<style>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
} 
:host{
    display: flex;
}
.icon {
    position: absolute;
    display: flex;
    fill: none;
    height: 2.6rem;
    width: 2.6rem;
    border-radius: 3rem;
    padding: 0.9rem;
    stroke: rgba(var(--foreground-color), 0.8);
    stroke-width: 14;
    overflow: visible;
    stroke-linecap: round;
    stroke-linejoin: round;
    cursor: pointer;
    min-width: 0;
    background: rgba(var(--text-color), 1);
    box-shadow: 0 0.2rem 0.2rem #00000020, 
                0 0.5rem 1rem #00000040; 
    -webkit-tap-highlight-color: transparent;
    transform: scale(0);
    z-index: 1;
}
.hide{
    pointer-events: none;
    opacity: 0;
}
.expand{
    transform: scale(1)
}
.previous-item{
    left: 1rem;
}
.next-item{
    right: 1rem;
}
.carousel-container{
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
}
.carousel{
    display: flex;
    max-width: 100%;
    width: 100%;
    overflow: auto hidden;
    scroll-snap-type: x mandatory;
}
.indicators{
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    position: absolute;
    bottom: -1rem;
    gap: 0.5rem;
    width: 100%;
}
.dot{
    position: relative;
    padding: 0.2rem;
    background: rgba(var(--text-color), 0.3);
    border-radius: 1rem;
    transition: 0.2s;
}
.dot.active{
    transform: scale(1.5);
    background: var(--accent-color);
}
slot::slotted(*){
    scroll-snap-align: center;
}
:host([align-items="start"]) slot::slotted(*){
    scroll-snap-align: start;
}
:host([align-items="center"]) slot::slotted(*){
    scroll-snap-align: center;
}
:host([align-items="end"]) slot::slotted(*){
scroll-snap-align: end;
}
@media (hover: hover){
.carousel{
    overflow: hidden;
}
.left,.right{
    display: none;
}
}
@media (hover: none){
::-webkit-scrollbar-track {
    -webkit-box-shadow: none !important;
    background-color: transparent !important;
}
::-webkit-scrollbar {
    height: 0;
    background-color: transparent;
}
.carousel{
    overflow: auto none;
}
.icon{
    display: none;
}
.left,.right{
    display: block;
}
}
</style>
<div class="carousel-container">
    <svg class="icon previous-item" viewBox="4 0 64 64">
    <title>Previous</title>
    <polyline points="48.01 0.35 16.35 32 48.01 63.65"/>
    </svg>
    <div part="carousel" class="carousel">
    <slot></slot>
    </div>
    <svg class="icon next-item" viewBox="-6 0 64 64">
    <title>Next</title>
    <polyline points="15.99 0.35 47.65 32 15.99 63.65"/>
    </svg>
    <div class="indicators"></div>
</div>
`;

customElements.define('sm-carousel', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).append(smCarousel.content.cloneNode(true))
    }

    static get observedAttributes() {
        return ['indicator']
    }

    scrollLeft = () => {
        this.carousel.scrollBy({
            top: 0,
            left: -this.scrollDistance,
            behavior: 'smooth'
        })
    }

    scrollRight = () => {
        this.carousel.scrollBy({
            top: 0,
            left: this.scrollDistance,
            behavior: 'smooth'
        })
    }

    connectedCallback() {
        this.carousel = this.shadowRoot.querySelector('.carousel')
        this.carouselContainer = this.shadowRoot.querySelector('.carousel-container')
        this.carouselSlot = this.shadowRoot.querySelector('slot')
        this.nextArrow = this.shadowRoot.querySelector('.next-item')
        this.previousArrow = this.shadowRoot.querySelector('.previous-item')
        this.indicatorsContainer = this.shadowRoot.querySelector('.indicators')
        this.carouselItems
        this.indicators
        this.showIndicator = false
        this.scrollDistance = this.carouselContainer.getBoundingClientRect().width / 3
        let frag = document.createDocumentFragment();
        if (this.hasAttribute('indicator'))
            this.showIndicator = true
        
        
        let firstVisible = false,
            lastVisible = false
        const allElementsObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(this.showIndicator)
                    if (entry.isIntersecting) {
                        this.indicators[parseInt(entry.target.attributes.rank.textContent)].classList.add('active')
                    }
                    else
                        this.indicators[parseInt(entry.target.attributes.rank.textContent)].classList.remove('active')
                if (!entry.target.previousElementSibling)
                    if(entry.isIntersecting) {
                        this.previousArrow.classList.remove('expand')
                        firstVisible = true
                    }
                    else {
                        this.previousArrow.classList.add('expand')
                        firstVisible = false
                    }
                if (!entry.target.nextElementSibling)
                    if(entry.isIntersecting) {
                        this.nextArrow.classList.remove('expand')
                        lastVisible = true
                    }
                    else {
                        this.nextArrow.classList.add('expand')

                        lastVisible = false
                    }
                if (firstVisible && lastVisible)
                    this.indicatorsContainer.classList.add('hide')
                else
                    this.indicatorsContainer.classList.remove('hide')
            })
        }, {
            root: this.carouselContainer,
            threshold: 0.9
        })

        const carouselObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                this.scrollDistance = this.carouselContainer.getBoundingClientRect().width / 3
            }
        })

        carouselObserver.observe(this.carouselContainer)

        this.carouselSlot.addEventListener('slotchange', e => {
            this.carouselItems = this.carouselSlot.assignedElements()
            this.carouselItems.forEach(item => allElementsObserver.observe(item))
            if(this.showIndicator){
                this.indicatorsContainer.innerHTML = ``
                this.carouselItems.forEach((item, index) => {
                    let dot = document.createElement('div')
                    dot.classList.add('dot')
                    frag.append(dot)
                    item.setAttribute('rank', index)
                })
                this.indicatorsContainer.append(frag)
                this.indicators = this.indicatorsContainer.children
            }
        })

        this.addEventListener('keyup', e => {
            if (e.code === 'ArrowLeft')
                this.scrollRight()
            else
                this.scrollRight()
        })

        this.nextArrow.addEventListener('click', this.scrollRight)
        this.previousArrow.addEventListener('click', this.scrollLeft)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'indicator') {
            if (this.hasAttribute('indicator'))
                this.showIndicator = true
            else
                this.showIndicator = false
        }
    }

    disconnectedCallback() {
        this.nextArrow.removeEventListener('click', this.scrollRight)
        this.previousArrow.removeEventListener('click', this.scrollLeft)
    }
})

//notifications

const smNotifications = document.createElement('template')
smNotifications.innerHTML = `
<style>
*{
padding: 0;
margin: 0;
box-sizing: border-box;
} 
:host{
display: flex;
}
.hide{
opacity: 0 !important;
pointer-events: none !important;
}
.notification-panel{
display: grid;
width: 100%;
position: fixed;
top: 0;
right: 0;
z-index: 100;
max-height: 100%;
overflow: hidden auto;
overscroll-behavior: contain;
}
.no-transformations{
transform: none;
opacity: 1;
}
.notification{
    display: flex;
    opacity: 0;
    padding: 1rem 1.5rem;
    margin-bottom: 0.5rem;
    transform: translateY(-1rem);
    position: relative;
    border-radius: 0.3rem;
    box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.1),
                0.5rem 1rem 2rem rgba(0, 0, 0, 0.1);
    background: rgba(var(--foreground-color), 1);
    transition: height 0.3s, transform 0.3s, opacity 0.3s;
    overflow: hidden;
    overflow-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-all;
    word-break: break-word;
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;
    max-width: 100%;
}
h4:first-letter,
p:first-letter{
text-transform: uppercase;
}
h4{
font-weight: 400;
}
p{
line-height: 1.6;
flex: 1;
color: rgba(var(--text-color), 0.9);
overflow-wrap: break-word;
overflow-wrap: break-word;
word-wrap: break-word;
-ms-word-break: break-all;
word-break: break-all;
word-break: break-word;
-ms-hyphens: auto;
-moz-hyphens: auto;
-webkit-hyphens: auto;
hyphens: auto;
max-width: 100%;
}
.notification:last-of-type{
margin-bottom: 0;
}
.icon {
fill: none;
height: 1.6rem;
width: 1.6rem;
stroke: rgba(var(--text-color), 0.7);
overflow: visible;
stroke-linecap: round;
border-radius: 1rem;
stroke-linejoin: round;
cursor: pointer;
}
.error-icon{
stroke: #E53935;
}
.success-icon{
stroke: #00C853;
}
.close{
margin-left: 1rem;
padding: 0.5rem;
stroke-width: 10;
}
.notification-icon{
height: 1.4rem;
width: 1.4rem;
margin-right: 0.6rem;
stroke-width: 6;
}
@media screen and (min-width: 640px){
.notification-panel{
    width: 40vw;
    justify-content: flex-end;
}
.notification{
    justify-self: end;
    width: auto;
    margin-right: 1.5rem;
    margin-bottom: 1rem;
    border-bottom: none;
    border: solid 1px rgba(var(--text-color), 0.2);
    transform: translateX(1rem);
}
}
@media screen and (any-hover: none){
.close{
    display: none
}
}
</style>
<div class="notification-panel">
</div>
`

customElements.define('sm-notifications', class extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' }).append(smNotifications.content.cloneNode(true))
    }

    handleTouchStart =(e) => {
        this.notification = e.target.closest('.notification')
        this.touchStartX = e.changedTouches[0].clientX
        this.notification.style.transition = 'initial'
        this.touchStartTime = e.timeStamp
    }

    handleTouchMove = (e) => {
        e.preventDefault()
        if (this.touchStartX < e.changedTouches[0].clientX) {
            this.offset = e.changedTouches[0].clientX - this.touchStartX;
            this.touchEndAnimataion = requestAnimationFrame(this.movePopup)
        }
        else {
            this.offset = -(this.touchStartX - e.changedTouches[0].clientX);
            this.touchEndAnimataion = requestAnimationFrame(this.movePopup)
        }
    }

    handleTouchEnd = (e) => {
        this.notification.style.transition = 'transform 0.3s, opacity 0.3s'
        this.touchEndTime = e.timeStamp
        cancelAnimationFrame(this.touchEndAnimataion)
        this.touchEndX = e.changedTouches[0].clientX
        if (this.touchEndTime - this.touchStartTime > 200) {
            if (this.touchEndX - this.touchStartX > this.threshold) {
                this.removeNotification(this.notification)
            }
            else if (this.touchStartX - this.touchEndX > this.threshold) {
                this.removeNotification(this.notification, true)
            }
            else {
                this.resetPosition()
            }
        }
        else {
            if (this.touchEndX > this.touchStartX) {
                this.removeNotification(this.notification)
            }
            else {
                this.removeNotification(this.notification, true)
            }
        }
    }

    movePopup = () => {
        this.notification.style.transform = `translateX(${this.offset}px)`
    }

    resetPosition = () => {
        this.notification.style.transform = `translateX(0)`
    }

    push = (messageBody, type, pinned) => {
        let notification = document.createElement('div'),
            composition = ``
        notification.classList.add('notification')
        if (pinned)
            notification.classList.add('pinned')
        if (type === 'error') {
            composition += `
    <svg class="notification-icon icon error-icon" viewBox="0 0 64 64">
            <path d="M32,4.73a3.17,3.17,0,0,1,2.76,1.59l13.9,24.09L62.57,54.49a3.19,3.19,0,0,1-2.76,4.78H4.19a3.19,3.19,0,0,1-2.76-4.78L15.34,30.41,29.24,6.32A3.17,3.17,0,0,1,32,4.73m0-1a4.14,4.14,0,0,0-3.62,2.09L14.47,29.91.57,54a4.19,4.19,0,0,0,3.62,6.28H59.81A4.19,4.19,0,0,0,63.43,54L49.53,29.91,35.62,5.82A4.14,4.14,0,0,0,32,3.73Z"/>
            <line x1="32" y1="24" x2="32" y2="36"/>
            <line x1="32" y1="46" x2="32" y2="48"/>
    </svg>`
        }
        else if (type === 'success') {
            composition += `
        <svg class="notification-icon icon success-icon" viewBox="0 0 64 64">
            <polyline points="0.35 31.82 21.45 52.98 63.65 10.66"/>
        </svg>`
        }
        composition += `
                    <p>${messageBody}</p>
                    <svg class="icon close" viewBox="0 0 64 64">
                        <title>Close</title>
                        <line x1="64" y1="0" x2="0" y2="64"/>
                        <line x1="64" y1="64" x2="0" y2="0"/>
                    </svg>`
        notification.innerHTML = composition
        this.notificationPanel.prepend(notification)
        if (window.innerWidth > 640) {
            notification.animate([
                {
                    transform: `translateX(1rem)`,
                    opacity: '0'
                },
                {
                    transform: 'translateX(0)',
                    opacity: '1'
                }
            ], this.animationOptions).onfinish = () => {
                notification.setAttribute('style', `transform: none;`);
            }
        }
        else {
            notification.setAttribute('style', `transform: translateY(0); opacity: 1`)
        }
        notification.addEventListener('touchstart', this.handleTouchStart)
        notification.addEventListener('touchmove', this.handleTouchMove)
        notification.addEventListener('touchend', this.handleTouchEnd)
    }

    removeNotification = (notification, toLeft) => {
        if (!this.offset)
            this.offset = 0;

        if (toLeft)
            notification.animate([
                {
                    transform: `translateX(${this.offset}px)`,
                    opacity: '1'
                },
                {
                    transform: `translateX(-100%)`,
                    opacity: '0'
                }
            ], this.animationOptions).onfinish = () => {
                notification.remove()
            }
        else {
            notification.animate([
                {
                    transform: `translateX(${this.offset}px)`,
                    opacity: '1'
                },
                {
                    transform: `translateX(100%)`,
                    opacity: '0'
                }
            ], this.animationOptions).onfinish = () => {
                notification.remove()
            }
        }
    }

    clearAll = () => {
        Array.from(this.notificationPanel.children).forEach(child => {
            this.removeNotification(child)
        })
    }

    connectedCallback() {
        this.notificationPanel = this.shadowRoot.querySelector('.notification-panel')
        this.animationOptions = {
            duration: 300,
            fill: "forwards",
            easing: "ease"
        }
        this.fontSize = Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0])
        this.notification
        this.offset
        this.touchStartX = 0
        this.touchEndX = 0
        this.touchStartTime = 0
        this.touchEndTime = 0
        this.threshold = this.notificationPanel.getBoundingClientRect().width * 0.3
        this.touchEndAnimataion;

        this.notificationPanel.addEventListener('click', e => {
            if (e.target.closest('.close')) (
                this.removeNotification(e.target.closest('.notification'))
            )
        })

        const observer = new MutationObserver(mutationList => {
            mutationList.forEach(mutation => {
                if (mutation.type === 'childList') {
                    if (mutation.addedNodes.length) {
                        if (!mutation.addedNodes[0].classList.contains('pinned'))
                            setTimeout(() => {
                                this.removeNotification(mutation.addedNodes[0])
                            }, 5000);
                        if (window.innerWidth > 640)
                            this.notificationPanel.style.padding = '1.5rem 0 3rem 1.5rem';
                        else
                            this.notificationPanel.style.padding = '1rem 1rem 2rem 1rem';
                    }
                    else if (mutation.removedNodes.length && !this.notificationPanel.children.length) {
                        this.notificationPanel.style.padding = 0;
                    }
                }
            })
        })
        observer.observe(this.notificationPanel, {
            attributes: true,
            childList: true,
            subtree: true
        })
    }
})


// sm-menu
const smMenu = document.createElement('template')
smMenu.innerHTML = `
<style>     
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    } 
    .menu{
        display: grid;
        place-items: center;
        position: relative;
        height: 2rem;
        width: 2rem;
        outline: none;
    }
    .icon {
        position: absolute;
        fill: rgba(var(--text-color), 0.7);
        height: 2.4rem;
        width: 2.4rem;
        padding: 0.7rem;
        stroke: rgba(var(--text-color), 0.7);
        stroke-width: 6;
        overflow: visible;
        stroke-linecap: round;
        stroke-linejoin: round;
        border-radius: 2rem;
        transition: background 0.3s;
    }      
    :host{
        display: inline-flex;
    }
    .hide{
        opacity: 0;
        pointer-events: none;
    }
    .select{
        position: relative;
        display: flex;
        flex-direction: column;
        cursor: pointer;
        width: 100%;
        -webkit-tap-highlight-color: transparent;
    }
    .menu:focus .icon,
    .focused{
        background: rgba(var(--text-color), 0.1); 
    }
    :host([align-options="left"]) .options{
        left: 0;
    }
    :host([align-options="right"]) .options{
        right: 0;
    }
    .options{
        padding: 0.5rem 0;
        overflow: hidden auto;
        position: absolute;
        display: flex;
        min-width: max-content;
        transform: translateY(-1rem);
        flex-direction: column;
        background: rgba(var(--foreground-color), 1);
        transition: opacity 0.3s, transform 0.3s;
        border: solid 1px rgba(var(--text-color), 0.2);
        border-radius: 0.3rem;
        z-index: 2;
        box-shadow: 0.4rem 0.8rem 1.2rem #00000030;
        top: 100%;
        bottom: auto;
    }
    .moveUp{
        top: auto;
        bottom: 100%;
        transform: translateY(1rem);
    }
    .moveLeft{
        left: auto: 
        right: 0;
    }
    .no-transformations{
        transform: none !important;
    }
    @media (hover: hover){
        .menu:hover .icon{
            background: rgba(var(--text-color), 0.1); 
        }
    }
</style>
<div class="select">
    <div class="menu" tabindex="0">
        <svg class="icon" viewBox="0 0 64 64">
            <title>options</title>
            <circle cx="32" cy="6" r="5.5"/>
            <circle cx="32" cy="58" r="5.5"/>
            <circle cx="32" cy="31.89" r="5.5"/>
        </svg>
    </div>
    <div class="options hide">
        <slot></slot> 
    </div>
</div>`;
customElements.define('sm-menu', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).append(smMenu.content.cloneNode(true))
    }
    static get observedAttributes() {
        return ['value']
    }
    get value() {
        return this.getAttribute('value')
    }
    set value(val) {
        this.setAttribute('value', val)
    }
    expand = () => {
        if (!this.open) {
            this.optionList.classList.remove('hide')
            this.optionList.classList.add('no-transformations')
            this.open = true
            this.icon.classList.add('focused')
        }
    }
    collapse() {
        if (this.open) {
            this.open = false
            this.icon.classList.remove('focused')
            this.optionList.classList.add('hide')
            this.optionList.classList.remove('no-transformations')
        }
    }
    connectedCallback() {
        this.availableOptions
        this.containerDimensions
        this.optionList = this.shadowRoot.querySelector('.options')
        let slot = this.shadowRoot.querySelector('.options slot'),
            menu = this.shadowRoot.querySelector('.menu')
        this.icon = this.shadowRoot.querySelector('.icon')
        this.open = false;
        menu.addEventListener('click', e => {
            if (!this.open) {
                this.expand()
            } else {
                this.collapse()
            }
        })
        menu.addEventListener('keydown', e => {
            if (e.code === 'ArrowDown' || e.code === 'ArrowRight') {
                e.preventDefault()
                this.availableOptions[0].focus()
            }
            if (e.code === 'Enter' || e.code === 'Space') {
                e.preventDefault()
                if (!this.open) {
                    this.expand()
                } else {
                    this.collapse()
                }
            }
        })
        this.optionList.addEventListener('keydown', e => {
            if (e.code === 'ArrowUp' || e.code === 'ArrowRight') {
                e.preventDefault()
                if (document.activeElement.previousElementSibling) {
                    document.activeElement.previousElementSibling.focus()
                }
            }
            if (e.code === 'ArrowDown' || e.code === 'ArrowLeft') {
                e.preventDefault()
                if (document.activeElement.nextElementSibling)
                    document.activeElement.nextElementSibling.focus()
            }
        })
        this.optionList.addEventListener('click', e => {
            this.collapse()
        })
        slot.addEventListener('slotchange', e => {
            this.availableOptions = slot.assignedElements()
            this.containerDimensions = this.optionList.getBoundingClientRect()
            this.menuDimensions = menu.getBoundingClientRect()
        });
        window.addEventListener('mousedown', e => {
            if (!this.contains(e.target) && e.button !== 2) {
                this.collapse()
            }
        })
        if (this.hasAttribute('set-context') && this.getAttribute('set-context') === 'true') {
            this.parentNode.setAttribute('oncontextmenu', 'return false')
            this.parentNode.addEventListener('mouseup', e => {
                if (e.button === 2) {
                    this.expand()
                }
            })
        }
    }
})

// option
const smMenuOption = document.createElement('template')
smMenuOption.innerHTML = `
<style>     
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }     
    :host{
        display: flex;
    }
    .option{
        opacity: 0.7;
        min-width: 100%;
        padding: 0.6rem 2rem;
        cursor: pointer;
        overflow-wrap: break-word;
        white-space: nowrap;
        outline: none;
        display: flex;
        align-items: center;
        text-transform: capitalize;
    }
    :host(:focus){
        outline: none;
        background: rgba(var(--text-color), 0.1);
    }
    @media (hover: hover){
        .option:hover{
            opacity: 1;
            background: rgba(var(--text-color), 0.1);
        }
    }
</style>
<div class="option">
    <slot></slot> 
</div>`;
customElements.define('sm-menu-option', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).append(smMenuOption.content.cloneNode(true))
    }

    connectedCallback() {
        this.addEventListener('keyup', e => {
            if (e.code === 'Enter' || e.code === 'Space') {
                e.preventDefault()
                this.click()
            }
        })
        this.setAttribute('tabindex', '0')
    }
})

// tab-header

const smTabHeader = document.createElement('template')
smTabHeader.innerHTML = `
<style>
*{
padding: 0;
margin: 0;
box-sizing: border-box;
} 
:host{
display: flex;
}
.tabs{
position: relative;
display: grid;
width: 100%;
}
.tab-header{
display: grid;
grid-auto-flow: column;
justify-content: flex-start;
gap: 1rem;
position: relative;
overflow: auto hidden;
max-width: 100%;
scrollbar-width: 0;
}
.indicator{
position: absolute;
left: 0;
bottom: 0;
height: 0.15rem;
border-radius: 1rem 1rem 0 0;  
background: var(--accent-color);
transition: transform 0.3s, width 0.3s;
pointer-events: none;
}
:host([variant="tab"]) .indicator{
height: 100%;
border-radius: 0.3rem;
}
:host([variant="tab"]) .tab-header{
border-bottom: none; 
}
.hide-completely{
display: none;
}
:host([variant="tab"]) .tab-header{
gap: 0;
display: inline-grid;
justify-self: flex-start;
background: rgba(var(--text-color), 0.1);
border-radius: 0.3rem;
}
:host([variant="tab"]) slot::slotted(.active){
color: rgba(var(--foreground-color), 1);
}
slot::slotted(.active){
color: var(--accent-color);
opacity: 1;
}
@media (hover: none){
.tab-header::-webkit-scrollbar-track {
-webkit-box-shadow: none !important;
background-color: transparent !important;
}
.tab-header::-webkit-scrollbar {
height: 0;
background-color: transparent;
}
}         
</style>
<div part="tab-container" class="tabs">
<div part="tab-header" class="tab-header">
<slot></slot>
<div part="indicator" class="indicator"></div>
</div>
</div>
`;

customElements.define('sm-tab-header', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).append(smTabHeader.content.cloneNode(true))

        this.indicator = this.shadowRoot.querySelector('.indicator');
        this.tabSlot = this.shadowRoot.querySelector('slot');
        this.tabHeader = this.shadowRoot.querySelector('.tab-header');
    }

    sendDetails(element) {
        this.dispatchEvent(
            new CustomEvent("switchtab", {
                bubbles: true,
                detail: {
                    target: this.target,
                    rank: parseInt(element.getAttribute('rank'))
                }
            })
        )
    }

    moveIndiactor(tabDimensions) {
        //if(this.isTab)
        this.indicator.setAttribute('style', `width: ${tabDimensions.width}px; transform: translateX(${tabDimensions.left - this.tabHeader.getBoundingClientRect().left + this.tabHeader.scrollLeft}px)`)
        //else
        //this.indicator.setAttribute('style', `width: calc(${tabDimensions.width}px - 1.6rem); transform: translateX(calc(${ tabDimensions.left - this.tabHeader.getBoundingClientRect().left + this.tabHeader.scrollLeft}px + 0.8rem)`)
    }

    connectedCallback() {
        if (!this.hasAttribute('target') || this.getAttribute('target').value === '') return;
        this.prevTab
        this.allTabs
        this.activeTab
        this.isTab = false
        this.target = this.getAttribute('target')

        if (this.hasAttribute('variant') && this.getAttribute('variant') === 'tab') {
            this.isTab = true
        }

        this.tabSlot.addEventListener('slotchange', () => {
            this.tabSlot.assignedElements().forEach((tab, index) => {
                tab.setAttribute('rank', index)
            })
        })
        this.allTabs = this.tabSlot.assignedElements();

        this.tabSlot.addEventListener('click', e => {
            if (e.target === this.prevTab || !e.target.closest('sm-tab'))
                return
            if (this.prevTab)
                this.prevTab.classList.remove('active')
            e.target.classList.add('active')

            e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
            this.moveIndiactor(e.target.getBoundingClientRect())
            this.sendDetails(e.target)
            this.prevTab = e.target;
            this.activeTab = e.target;
        })
        let resizeObserver = new ResizeObserver(entries => {
            entries.forEach((entry) => {
                if (this.prevTab) {
                    let tabDimensions = this.activeTab.getBoundingClientRect();
                    this.moveIndiactor(tabDimensions)
                }
            })
        })
        resizeObserver.observe(this)
        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.indicator.style.transition = 'none'
                    if (this.activeTab) {
                        let tabDimensions = this.activeTab.getBoundingClientRect();
                        this.moveIndiactor(tabDimensions)
                    }
                    else {
                        this.allTabs[0].classList.add('active')
                        let tabDimensions = this.allTabs[0].getBoundingClientRect();
                        this.moveIndiactor(tabDimensions)
                        this.sendDetails(this.allTabs[0])
                        this.prevTab = this.tabSlot.assignedElements()[0];
                        this.activeTab = this.prevTab;
                    }
                }
            })
        },
            { threshold: 1.0 })
        observer.observe(this)
    }
})

// tab-panels

const smTabPanels = document.createElement('template')
smTabPanels.innerHTML = `
<style>
*{
padding: 0;
margin: 0;
box-sizing: border-box;
} 
:host{
width: 100%;
}
.panel-container{
position: relative;
display: flex;
width: 100%;
height: 100%
overflow: hidden auto;
}
slot::slotted(.hide-completely){
display: none;
}
@media (hover: none){
.tab-header::-webkit-scrollbar-track {
-webkit-box-shadow: none !important;
background-color: transparent !important;
}
.tab-header::-webkit-scrollbar {
height: 0;
background-color: transparent;
}
}         
</style>
<div part="panel-container" class="panel-container">
<slot>Nothing to see here.</slot>
</div>
`;

customElements.define('sm-tab-panels', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).append(smTabPanels.content.cloneNode(true))
        this.panelSlot = this.shadowRoot.querySelector('slot');
    }
    connectedCallback() {

        //animations
        let flyInLeft = [
            {
                opacity: 0,
                transform: 'translateX(-1rem)'
            },
            {
                opacity: 1,
                transform: 'none'
            }
        ],
            flyInRight = [
                {
                    opacity: 0,
                    transform: 'translateX(1rem)'
                },
                {
                    opacity: 1,
                    transform: 'none'
                }
            ],
            flyOutLeft = [
                {
                    opacity: 1,
                    transform: 'none'
                },
                {
                    opacity: 0,
                    transform: 'translateX(-1rem)'
                }
            ],
            flyOutRight = [
                {
                    opacity: 1,
                    transform: 'none'
                },
                {
                    opacity: 0,
                    transform: 'translateX(1rem)'
                }
            ],
            animationOptions = {
                duration: 300,
                fill: 'forwards',
                easing: 'ease'
            }
        this.prevPanel
        this.allPanels
        this.previousRank

        this.panelSlot.addEventListener('slotchange', () => {
            this.panelSlot.assignedElements().forEach((panel) => {
                panel.classList.add('hide-completely')
            })
        })
        this.allPanels = this.panelSlot.assignedElements()
        this._targetBodyFlyRight = (targetBody) => {
            targetBody.classList.remove('hide-completely')
            targetBody.animate(flyInRight, animationOptions)
        }
        this._targetBodyFlyLeft = (targetBody) => {
            targetBody.classList.remove('hide-completely')
            targetBody.animate(flyInLeft, animationOptions)
        }
        document.addEventListener('switchtab', e => {
            if (e.detail.target !== this.id)
                return

            if (this.prevPanel) {
                let targetBody = this.allPanels[e.detail.rank],
                    currentBody = this.prevPanel;
                if (this.previousRank < e.detail.rank) {
                    if (currentBody && !targetBody)
                        currentBody.animate(flyOutLeft, animationOptions).onfinish = () => {
                            currentBody.classList.add('hide-completely')
                        }
                    else if (targetBody && !currentBody) {
                        this._targetBodyFlyRight(targetBody)
                    }
                    else if (currentBody && targetBody) {
                        currentBody.animate(flyOutLeft, animationOptions).onfinish = () => {
                            currentBody.classList.add('hide-completely')
                            this._targetBodyFlyRight(targetBody)
                        }
                    }
                } else {
                    if (currentBody && !targetBody)
                        currentBody.animate(flyOutRight, animationOptions).onfinish = () => {
                            currentBody.classList.add('hide-completely')
                        }
                    else if (targetBody && !currentBody) {
                        this._targetBodyFlyLeft(targetBody)
                    }
                    else if (currentBody && targetBody) {
                        currentBody.animate(flyOutRight, animationOptions).onfinish = () => {
                            currentBody.classList.add('hide-completely')
                            this._targetBodyFlyLeft(targetBody)
                        }
                    }
                }
            } else {
                this.allPanels[e.detail.rank].classList.remove('hide-completely')
            }
            this.previousRank = e.detail.rank
            this.prevPanel = this.allPanels[e.detail.rank];
        })
    }
})


const slidingSection = document.createElement('template')
slidingSection.innerHTML = `
<style>
*{
margin: 0;
padding: 0;
box-sizzing: border-box;
}
:host{
display: flex;
height: 100%;
width: 100%;
}
.section{
display: flex;
max-width: 100%;
overflow: hidden auto;
scroll-snap-type: mandatory x;
}

</style>
<section class="section">
<slot></slot>
</section>
`

customElements.define('sm-sliding-section', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).append(slidingSection.content.cloneNode(true))
    }
    connectedCallback() {

    }
})

const section = document.createElement('template')
section.innerHTML = `
<style>
*{
margin: 0;
padding: 0;
box-sizzing: border-box;
}
:host{
display: flex;
}
.section{
min-width: 100%;
scroll-snap-align: start;
}

</style>
<section class="section">
<slot></slot>
</section>
`

customElements.define('sm-section', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).append(section.content.cloneNode(true))
    }
})