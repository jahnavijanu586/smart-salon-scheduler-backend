from app.models.log_model import AuditLog

def create_log(
    db,
    action,
    user_email
):

    log = AuditLog(
        action=action,
        user_email=user_email
    )

    db.add(log)
    db.commit()