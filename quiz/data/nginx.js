(window.QUIZ_SUBJECTS = window.QUIZ_SUBJECTS || []).push({
  id: "nginx", icon: "🧱", title: "Nginx და Web Server", desc: "virtual host, reverse proxy, SSL",
  questions: [
    ["სად ინახება Ubuntu-ზე Nginx-ის საიტების კონფიგურაცია?", ["/etc/nginx/sites-available", "/var/nginx", "/usr/nginx", "/opt/sites"], 0, "ჩასართავად symlink `sites-enabled`-ში."],
    ["რომელი ბრძანება ამოწმებს Nginx კონფიგს?", ["nginx -t", "nginx --lint", "systemctl check nginx", "nginx -v"], 0],
    ["კონფიგის შეცვლის შემდეგ დროს გაუჩერებლად გადასატვირთად:", ["systemctl reload nginx", "reboot", "nginx --kill", "apt remove nginx"], 0],
    ["რა არის virtual host?", ["ერთ სერვერზე რამდენიმე საიტის სხვადასხვა `server_name`-ით მომსახურება", "ვირტუალური მანქანა", "პროქსი", "DNS ჩანაწერი"], 0],
    ["რას აკეთებს `proxy_pass`?", ["მოთხოვნას სხვა სერვისზე გადასცემს (reverse proxy)", "ფაილს ანაწილებს", "ქეშს ასუფთავებს", "SSL-ს რთავს"], 0],
    ["რა განსხვავებაა forward და reverse proxy-ს შორის?", ["reverse proxy სერვერების წინ დგას, კლიენტებისგან მალავს backend-ს", "არაფერი", "forward სერვერშია", "reverse მხოლოდ DNS-ია"], 0],
    ["`unknown directive \"sudo\"` Nginx კონფიგში ნიშნავს:", ["ტერმინალის ბრძანება შემთხვევით ფაილში ჩაიწერა", "Nginx root-ს ითხოვს", "პორტი დაკავებულია", "SSL არაა"], 0],
    ["რატომ არ ისმენს 443-ს სერვერი, თუ `ssl` ხაზები არასწორ server block-შია?", ["listen 443 ssl სხვა block-ში არ არის", "firewall-ის გამო", "Docker-ის გამო", "cron-ის გამო"], 0, "ვამოწმებთ `ss -tlnp | grep 443`."],
    ["self-signed სერტიფიკატზე ბრაუზერი გვაფრთხილებს, რადგან:", ["სანდო CA-ს არ გაუცია", "ძველია", "პორტი არასწორია", "Nginx-ის ბრალია"], 0],
    ["რომელი ფაილი აჩვენებს Nginx შეცდომებს?", ["/var/log/nginx/error.log", "/etc/nginx/error", "/tmp/nginx.err", "/home/nginx.log"], 0],
    ["Docker-ის `web` კონტეინერი `127.0.0.1:8080:80`-ზეა. გარედან როგორ ვხედავთ?", ["Nginx reverse proxy-ით host-ზე", "პირდაპირ 8080-ით ნებისმიერი IP-დან", "ვერ ვხედავთ ვერასდროს", "მხოლოდ SSH-ით"], 0, "127.0.0.1 მიბმა გარედან პირდაპირ წვდომას კრძალავს."],
    ["`server_name app.test 100.120.57.75;` რას ნიშნავს?", ["ორივე სახელზე/IP-ზე იმავე ბლოკით მომსახურება", "ორი სერვერი", "DNS შექმნა", "SSL გამორთვა"], 0]
  ]
});
