#!/bin/bash
# 민감한 파일 수정 방지 훅

SENSITIVE_PATTERNS=(
  ".env"
  ".env.local"
  ".env.production"
  ".env.development"
  "credentials"
  "secret"
  ".pem"
  ".key"
)

# CLAUDE_TOOL_INPUT에서 파일 경로 추출
FILE_PATH="$CLAUDE_TOOL_INPUT"

for pattern in "${SENSITIVE_PATTERNS[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    echo "⚠️ 경고: 민감한 파일 수정 시도가 감지되었습니다: $FILE_PATH"
    echo "이 파일은 보안상 이유로 직접 수정이 제한됩니다."
    exit 1
  fi
done

exit 0
