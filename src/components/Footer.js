import React from 'react'

export default function Footer() {
	const handlePrometheusLink = () => {
		window.open('https://prometheus.org.ua/', '_blank')
	}

	return (
		<footer>
			<p onClick={handlePrometheusLink}>
				Виконано в <span className="prometheus-link">Prometheus</span> © 2023
			</p>
		</footer>
	);
}
