// Fetch the structured JSON data computed by the automated Python engine
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // --- 1. HYDRATE MAIN PROJECT CARDS MATRIX ---
        const projectContainer = document.getElementById('project-matrix-container');
        projectContainer.innerHTML = ''; // Wipe out loading placeholders

        data.projects.forEach(item => {
            const card = document.createElement('div');
            card.className = "p-5 bg-gray-900 border border-gray-800 rounded-xl shadow-xl flex flex-col justify-between transition-all hover:border-gray-700";
            
            // Format color markers depending on whether the project is slipping/delayed
            const alertStatus = item.status === "Delayed";
            const statusBadgeClass = alertStatus ? "bg-red-950/60 text-red-400 border-red-900" : "bg-emerald-950/60 text-emerald-400 border-emerald-900";
            const progressColorClass = alertStatus ? "bg-red-500" : "bg-emerald-500";

            card.innerHTML = `
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <span class="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded border ${statusBadgeClass}">${item.status}</span>
                        <h3 class="text-lg font-bold text-white mt-2">${item.project}</h3>
                        <p class="text-xs text-gray-400 mt-0.5">${item.minister}</p>
                    </div>
                </div>
                
                <div class="border-t border-gray-800 pt-3 mt-2">
                    <div class="flex justify-between items-center text-xs text-gray-400 mb-1.5">
                        <span>Tender Assigned: <strong class="text-gray-200 font-mono text-[11px]">${item.tender}</strong></span>
                        <span class="font-mono ${alertStatus ? 'text-red-400' : 'text-emerald-400'}">Systemic Slip: ${item.decay}%</span>
                    </div>
                    <div class="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                        <div class="${progressColorClass} h-full transition-all duration-500" style="width: ${item.decay}%"></div>
                    </div>
                </div>
            `;
            projectContainer.appendChild(card);
        });

        // --- 2. HYDRATE NATIONAL HEADLINES FEED ---
        const newsContainer = document.getElementById('news-feed-container');
        newsContainer.innerHTML = ''; // Wipe out loading placeholders

        data.news.forEach(article => {
            const item = document.createElement('div');
            item.className = "border-b border-gray-800 pb-3 last:border-0 last:pb-0 group";
            item.innerHTML = `
                <a href="${article.link}" target="_blank" class="text-sm font-semibold text-gray-200 group-hover:text-purple-400 transition-colors block leading-snug">
                    ${article.title}
                </a>
                <span class="text-[10px] font-mono text-gray-500 mt-1 block">${article.date}</span>
            `;
            newsContainer.appendChild(item);
        });
    })
    .catch(error => {
        console.error("Pipeline Sync Error:", error);
        document.getElementById('project-matrix-container').innerHTML = `
            <div class="p-4 bg-red-950/40 border border-red-900 text-red-400 text-sm rounded-lg">
                System Framework Warning: data.json matrix not populated yet. Run your GitHub Action workflow to initiate the dataset.
            </div>
        `;
    });