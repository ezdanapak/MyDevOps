(window.QUIZ_SUBJECTS = window.QUIZ_SUBJECTS || []).push({
  id: "cicd", icon: "🔁", title: "GitLab CI/CD", desc: "pipeline, rules, artifacts, cache, tags",
  questions: [
    ["რა არის Runner?", ["პროცესი, რომელიც job-ებს ასრულებს", "branch", "ტოკენი", "ბრაუზერი"], 0],
    ["Pipeline-ის სტრუქტურა:", ["stages → jobs → script", "jobs → branches", "tags → stages", "script → runner → repo"], 0],
    ["რა განსხვავებაა artifact-სა და cache-ს შორის?", ["artifact შედეგია შესანახად, cache დროის დასაზოგად", "იგივეა", "cache ჩამოსატვირთია", "artifact არასდროს გადაეცემა job-ს"], 0, "Artifact = ამანათი, cache = მაცივარი."],
    ["რატომ `when: always` debug artifact-ზე?", ["job ჩავარდნისასაც შეინახოს", "სიჩქარისთვის", "სისუფთავისთვის", "ტოკენისთვის"], 0],
    ["`needs` რას აკეთებს?", ["job-ს კონკრეტულ job-ს ამოწმებინებს და artifact-ს გადასცემს", "stage-ს შლის", "Runner-ს ცვლის", "cache-ს ასუფთავებს"], 0],
    ["`CI_PIPELINE_IID` რა არის?", ["პროექტის pipeline-ის ნომერი 1,2,3...", "commit hash", "branch სახელი", "runner ID"], 0, "`snapshot-$CI_PIPELINE_IID`."],
    ["`workflow: rules` რას წყვეტს?", ["pipeline საერთოდ შეიქმნას თუ არა", "job-ის script-ს", "cache key-ს", "Docker tag-ს"], 0],
    ["rules ითვლება:", ["ზემოდან ქვემოთ, პირველი დამთხვევა იგებს", "ქვემოდან ზემოთ", "შემთხვევით", "ყველა ერთად"], 0],
    ["`when: manual` job-ისთვის ნიშნავს:", ["Play ღილაკს ელოდება", "ავტომატურად ეშვება", "არ ეშვება", "ორჯერ ეშვება"], 0],
    ["რატომ არ ვწერთ token-ს YAML-ში?", ["repo-ს ყველა ხედავს; ვინახავთ masked CI/CD Variable-ში", "YAML არ იღებს", "გრძელია", "კოდი ნელდება"], 0],
    ["`include` და `trigger` განსხვავება:", ["include ფაილს კითხულობს, trigger სხვა pipeline-ს უშვებს", "იგივეა", "include pipeline-ს უშვებს", "trigger ფაილს კითხულობს"], 0],
    ["Dind-ის (`docker:27-dind`) მიზანი CI-ში:", ["Docker daemon სერვისი build-ისთვის", "ბაზა", "cache", "linter"], 0],
    ["Pipeline წითლდება — ლოგში რას ვეძებთ?", ["პირველ ნამდვილ failed command-ს", "ბოლო ხაზს მხოლოდ", "ფერებს", "ავტორს"], 0]
  ]
});
