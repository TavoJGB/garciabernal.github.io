(function () {
	"use strict";

	function getCurrentFileName() {
		var path = window.location.pathname || "";
		// Remove trailing slash
		if (path.length > 1 && path.charAt(path.length - 1) === "/") path = path.slice(0, -1);
		var file = path.split("/").pop();
		return file || "index.html";
	}

	function applyCurrentClass(navRoot) {
		var current = getCurrentFileName();
		var links = navRoot.querySelectorAll("a[href]");
		for (var i = 0; i < links.length; i++) {
			var href = links[i].getAttribute("href");
			if (!href) continue;

			// Match exact filename (ignore any query/hash)
			var normalized = href.split("?")[0].split("#")[0];
			if (normalized === current) {
				var li = links[i].closest("li");
				if (li) li.classList.add("current");
			}
		}
	}

	function loadMainJs() {
		var existing = document.querySelector('script[src="assets/js/main.js"]');
		if (existing) return;
		var script = document.createElement("script");
		script.src = "assets/js/main.js";
		script.defer = false;
		document.body.appendChild(script);
	}

	function injectNav(html) {
		var nav = document.getElementById("nav");
		if (!nav) {
			loadMainJs();
			return;
		}
		nav.innerHTML = html;
		applyCurrentClass(nav);
		loadMainJs();
	}

	document.addEventListener("DOMContentLoaded", function () {
		var nav = document.getElementById("nav");
		if (!nav) {
			loadMainJs();
			return;
		}

		fetch("partials/nav.html", { cache: "no-cache" })
			.then(function (r) {
				if (!r.ok) throw new Error("Failed to load nav: " + r.status);
				return r.text();
			})
			.then(injectNav)
			.catch(function () {
				// Fallback so the site still works even if fetch fails.
				injectNav(
					'<ul>' +
						'<li><span>Gustavo <span class="versalitas">García Bernal</span></span></li>' +
						'<li class="divider">|</li>' +
						'<li><a href="index.html">Home</a></li>' +
						'<li><a href="research.html">Research</a></li>' +
						'<li><a href="teaching.html">Teaching</a></li>' +
						'<li><a href="cv.html">CV</a></li>' +
						'<li><a href="about.html">About me</a></li>' +
					'</ul>'
				);
			});
	});
})();
