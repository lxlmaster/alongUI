#!/bin/bash
cd D:/codex/alongUI/packages/components || exit 1
for d in */; do
  name="${d%/}"
  [ "$name" = "node_modules" ] || [ "$name" = "style" ] && continue

  vue_sz=0
  for f in "$name"/src/*.vue; do
    [ -f "$f" ] && { s=$(wc -c < "$f"); [ "$s" -gt "$vue_sz" ] && vue_sz=$s; }
  done

  ts_sz=0
  for f in "$name"/src/*.ts; do
    [ -f "$f" ] && { s=$(wc -c < "$f"); [ "$s" -gt "$ts_sz" ] && ts_sz=$s; }
  done

  has_style=$([ -f "$name/style/index.scss" ] && echo Y || echo N)
  has_tests=$([ -d "$name/__tests__" ] && echo Y || echo N)
  has_index=$([ -f "$name/index.ts" ] && echo Y || echo N)

  if [ "$vue_sz" -gt 500 ] && [ "$ts_sz" -gt 100 ] && [ "$has_style" = "Y" ] && [ "$has_index" = "Y" ]; then
    status="COMPLETE"
  elif [ "$vue_sz" -gt 0 ] || [ "$ts_sz" -gt 0 ]; then
    status="PARTIAL"
  else
    status="EMPTY"
  fi

  printf "%-18s v=%-6d t=%-6d s=%-1s x=%-1s i=%-1s  %s\n" "$name" "$vue_sz" "$ts_sz" "$has_style" "$has_tests" "$has_index" "$status"
done
