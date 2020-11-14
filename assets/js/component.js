class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav>
    <div class="nav-section">
    <a href="../../index.html"><div class="navbar-logo"><h4>Pace</h4></div></a>
    <div class="navbar-container">
      <input type="checkbox" class="toggler">
      <div class="hamburger"><div></div></div>
      <div class="navbar-collapse">
      <div>
        <div>
          <ul class="nav-list">
            <li><a href="../../index.html" class="nav-item home">Home</a></li>
            <li><a href="/contents/pricing2.html" class="nav-item pricing">Pricing</a></li>
            <li><a href="/contents/about.html" class="nav-item about">About</a></li>
            <li><a href="/contents/contact-us.html" class="nav-item contact">Contact</a></li>
            <li><a href="../../contents/login.html"><button class="nav-login-button ">Log In</button></a></li>
            <li><a href="../../contents/register.html"><button class="nav-signup-button">Sign Up</button></a></li>
          </ul>
        </div>
      </div>  
      </div>
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
        <div class="pre-footer">
          <div>
          <h3>Say hello to Pace</h3>
          <p>And goodbye to inefficiency, frustration, clunky timesheets — you get the idea</p>
        </div>
      </div>
        <div class="footer-container">
          <div  class="footer-section left-side">
            <div class="left-side-1" >
              <p>Software</p>
              <p>Overview </p>
              <p>Time tracking </p>
              <p>Employee productivity </p>
              <p>Employee monitoring </p>
              <p>Online timesheets </p>
              <p>Online payroll </p>
            </div>
            <div class="left-side-2">
              <p>More</p>
              <p>About us</p>
              <p>Blog</p>
              <p>Affiliates</p>
              <p>Resources</p>
            </div>
          </div>
          <div class="footer-section right-side">
            <div class="right-side-1">
              <p>Contact</p>
              <p>Demo</p>
              <p>Help</p>
              <p>Center</p>
              <p>FAQ</p>
              <p>Email Us</p>
              <p>Press</p>
            </div>
            <div class="right-side-2">
              <div>
              <h3 class> Ready to get started?</h3>
              <input type="text" class="company-email" placeholder="Your Company's Email"></input>
              <button class="subscribe">Let's go</button>
            </div>
              <p> Team T-Circuit &copy; 2020</p>
            </div>
          </div>
        </div>  
    </footer>
    `;
    }
}

class Toggle extends HTMLElement {
  connectedCallback() {
    this.innerHTML=`
    <label class="switch">
    <input type="checkbox">
    <span class="slider"></span>
</label>
    `;
  }
}

customElements.define('main-header', Header);
customElements.define('main-footer', Footer);
customElements.define('toggle-switch', Toggle);