(window.QUIZ_SUBJECTS = window.QUIZ_SUBJECTS || []).push({
  id: "k8s", icon: "☸️", title: "Kubernetes", desc: "Pod, ReplicaSet, Deployment, kubectl",
  questions: [
    ["რა არის Pod?", ["ერთი ან მეტი container-ის runtime გარემო", "node", "ქსელი", "image"], 0],
    ["ReplicaSet-ის საქმე:", ["Pod-ების რაოდენობის შენარჩუნება", "image-ის აგება", "DNS", "secret-ები"], 0],
    ["Deployment რას მართავს?", ["ReplicaSet-ებს, rollout/rollback-ით", "node-ებს", "ქსელს", "დისკებს"], 0],
    ["მოკვდა Pod, რომელიც Deployment-ს ეკუთვნის. რა ხდება?", ["ახალი Pod შეიქმნება", "არაფერი", "Deployment წაიშლება", "node გაითიშება"], 0],
    ["პირდაპირ შექმნილი Pod-ის წაშლის შემდეგ:", ["აღარ დაბრუნდება", "დაბრუნდება", "ReplicaSet შექმნის", "node გადაიტვირთება"], 0],
    ["selector და template labels უნდა:", ["ემთხვეოდეს", "განსხვავდებოდეს", "ცარიელი იყოს", "იყოს მხოლოდ app"], 0],
    ["rolling update-ზე image ცვლილება:", ["ახალ ReplicaSet-ს ქმნის, ძველს ამცირებს", "ყველა Pod-ს ერთდროულად შლის", "node-ს ცვლის", "Secret-ს ცვლის"], 0],
    ["უკან დასაბრუნებლად:", ["kubectl rollout undo deployment/web", "kubectl delete node", "kubectl scale 0", "kubectl logs"], 0],
    ["`ImagePullBackOff`-ის სავარაუდო მიზეზი:", ["არასწორი image/tag ან registry წვდომა", "CPU ლიმიტი", "ქსელი გამორთულია", "cron"], 0],
    ["Pod-ის დეტალური დიაგნოსტიკა (Events):", ["kubectl describe pod", "kubectl get nodes", "kubectl top", "kubectl config"], 0],
    ["scale-ზე იცვლება:", ["replicas რაოდენობა, template იგივე რჩება", "image", "labels", "namespace"], 0],
    ["Secret და ConfigMap-ის განსხვავება:", ["Secret მგრძნობიარე მონაცემებისთვისაა, ConfigMap ჩვეულებრივი კონფიგისთვის", "იგივეა", "ConfigMap დაშიფრულია", "Secret მხოლოდ ფაილია"], 0]
  ]
});
