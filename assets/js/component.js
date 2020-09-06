class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav>
        <div class="nav-section">
        <a href="../../index.html"><div class="navbar-logo"></div></a>
        <div class="navbar-container">
          <ul class="nav-list">
            <li><a href="../../index.html" class="nav-item">HOME</a></li>
            <li><a href="#" class="nav-item">PRICING</a></li>
            <li><a href="/contents/service.html" class="nav-item">SERVICES</a></li>
            <li><a href="/contents/about.html" class="nav-item">ABOUT</a></li>
            <li><a href="/contents/contact-us.html" class="nav-item">CONTACT</a></li>
            <li><button class="nav-button">Log In</button></li>
          </ul>
        </div>
        </div>
      </nav>
      `;
    }
}

class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer>
            <div class="footer-container">
            <p class> Get started</p>
            <input type="text" class="company-email" placeholder="Your Company's Email"></input>
            <button class="subscribe">Let's go</button>
            <p> Team T-Circuit &copy; 2020</p>
            </div>
        </footer>
    `;
    }
}

customElements.define('main-header', Header);
customElements.define('main-footer', Footer);
