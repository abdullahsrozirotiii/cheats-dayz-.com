# Commits with GitHub identity abdullahsrozirotiii (does not change global git config).
# Usage: .\scripts\commit.ps1 "your commit message"
param(
  [Parameter(Mandatory = $true, Position = 0)]
  [string]$Message
)

if (-not $Message.Trim()) {
  Write-Error 'Commit message is required.'
  exit 1
}

git -c user.name=abdullahsrozirotiii `
  -c user.email=353450645+abdullahsrozirotiii@users.noreply.github.com `
  commit -m $Message
