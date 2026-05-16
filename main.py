import os
import json
import feedparser

def main():
    # 1. Gather National News Data via Google News RSS
    rss_url = "https://news.google.com/rss/search?q=India+politics&hl=en-IN&gl=IN&ceid=IN:en"
    feed = feedparser.parse(rss_url)
    
    news_data = []
    for entry in feed.entries[:5]:
        news_data.append({
            "title": entry.title,
            "link": entry.link,
            "date": entry.published
        })
        
    # 2. Map Project Matrices, Ministers, and Development Slips (Decay Metrics)
    # In a production phase, you can write scraper routines here to pull live tables
    project_data = [
        {
            "minister": "Ministry of Road Transport & Highways", 
            "project": "Expressway Expansion Phase 4", 
            "tender": "National Infra Ltd",
            "status": "Delayed", 
            "decay": 78
        },
        {
            "minister": "Ministry of Electronics & IT", 
            "project": "Rural Broadband Integration", 
            "tender": "Apex Telecom Matrix",
            "status": "Active", 
            "decay": 12
        },
        {
            "minister": "Ministry of Power", 
            "project": "Solar Grid Coupling Asset", 
            "tender": "SunVolt Energy",
            "status": "Delayed", 
            "decay": 55
        }
    ]

    # Combine into a structured data payload
    master_payload = {
        "news": news_data,
        "projects": project_data
    }

    # 3. Write directly into the public distribution asset folder
    os.makedirs("public", exist_ok=True)
    with open("public/data.json", "w", encoding="utf-8") as f:
        json.dump(master_payload, f, indent=4)
        
    print("Data compilation sync successfully completed.")

if __name__ == "__main__":
    main()