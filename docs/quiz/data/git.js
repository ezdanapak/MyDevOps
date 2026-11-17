(window.QUIZ_SUBJECTS = window.QUIZ_SUBJECTS || []).push({
  id: "git", icon: "🌿", title: "Git და Workflow", desc: "commit, branch, merge, remote, deploy key",
  questions: [
    ["რას აკეთებს `git add`?", ["ფაილებს staging area-ში ამატებს", "ასუფთავებს repo-ს", "ზეცას გზავნის", "branch-ს ქმნის"], 0],
    ["რა არის commit?", ["ცვლილებების შენახული snapshot", "remote", "branch", "tag"], 0],
    ["რომელი ბრძანება ქმნის ახალ branch-ს და გადადის მასზე?", ["git checkout -b feature", "git new feature", "git branch -d feature", "git switch -x"], 0, "`git switch -c feature` ასევე."],
    ["რას აკეთებს `git pull --ff-only`?", ["მხოლოდ fast-forward განახლებას, merge commit-ის გარეშე", "ყველაფერს წერს თავზე", "branch-ს შლის", "push-ს აკეთებს"], 0],
    ["`git status` რას გვიჩვენებს?", ["working tree და staging მდგომარეობას", "ისტორიას", "remote-ებს", "tag-ებს"], 0],
    ["როგორ ვნახოთ ისტორია ერთ ხაზად?", ["git log --oneline", "git show-all", "git diff --log", "git history"], 0],
    ["რისთვისაა deploy key GitHub-ზე?", ["სერვერს repo-ზე წვდომას აძლევს ერთი key-ით", "მომხმარებლის შესასვლელად", "ბილინგისთვის", "CI ტოკენი"], 0, "ჩვენთან: ssh alias `github-docker-app`."],
    ["`Author identity unknown` შეცდომის გამოსწორება:", ["git config user.name / user.email", "git reset", "git init", "git clean"], 0],
    ["რატომ ჯობს noreply email commit-ებში?", ["რეალური email არ ქვეყნდება", "სიჩქარე", "ფორმატი", "აუცილებელია GitHub-ზე"], 0],
    ["რას აკეთებს `git tag v1.0.0`?", ["commit-ს release სახელს არქმევს", "branch-ს შლის", "remote-ს ქმნის", "ფაილს ამატებს"], 0],
    ["`git revert` განსხვავდება `git reset`-ისგან იმით, რომ:", ["ქმნის ახალ commit-ს ისტორიის გადაწერის გარეშე", "ისტორიას წერს გადაწერით", "ფაილებს შლის", "remote-ს ცვლის"], 0],
    ["main branch-ზე ინიციალიზაციის შემდეგ ჩანს `master`. გასასწორებლად:", ["git branch -m main", "git remote rename", "git rm master", "git merge main"], 0]
  ]
});
