(function () {
	"use strict";

	function injectFooter(html) {
		var footer = document.getElementById("footer");
		if (!footer) return;

		footer.innerHTML = html;

		var yearEl = footer.querySelector("#copyright-year");
		if (yearEl) yearEl.textContent = String(new Date().getFullYear());
	}

	document.addEventListener("DOMContentLoaded", function () {
		var footer = document.getElementById("footer");
		if (!footer) return;

		fetch("partials/footer.html", { cache: "no-cache" })
			.then(function (r) {
				if (!r.ok) throw new Error("Failed to load footer: " + r.status);
				return r.text();
			})
			.then(injectFooter)
			.catch(function () {
				injectFooter(
					'<div class="container">' +
						'<div class="row">' +
							'<div class="col-12">' +
								'<div class="copyright">' +
									'<ul class="menu">' +
										'<li>&copy; <span id="copyright-year"></span> Gustavo García Bernal</li>' +
										'<li>Design: <a href="http://html5up.net">HTML5 UP</a></li>' +
										'<li class="menu-icons">' +
											'<ul class="icons footer-icons">' +
												'<li><a href="mailto:gustavo.garciabernal@sciencespo.fr" class="icon solid fa-envelope"><span class="label">Email</span></a></li>' +
												'<li><a href="https://www.linkedin.com/in/gustavojgb/" class="icon brands fa-linkedin-in"><span class="label">LinkedIn</span></a></li>' +
												'<li><a href="https://github.com/tavojgb" class="icon brands fa-github"><span class="label">GitHub</span></a></li>' +
											'</ul>' +
										'</li>' +
									'</ul>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>'
				);
			});
	});
})();
